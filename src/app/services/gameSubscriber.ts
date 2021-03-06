import {EventAggregator} from 'aurelia-event-aggregator';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';
import {GameFinishedEvent} from '../services/gameFinishedEvent';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(EventAggregator, Router, ChallengeRegistry)
export class GameSubscriber {
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;

    constructor(
        eventAggregator:EventAggregator,
        router:Router,
        registry:ChallengeRegistry
    ) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.registry = registry;
    }

    subscribe() {
        this.eventAggregator.subscribe(GameFinishedEvent, payload => {
            let currentChallenge = payload.challenge;
            try {
                let previousChallenge = this.registry.findChallengeByName(currentChallenge.name);
                let diff = (currentChallenge.distance - previousChallenge.distance);
                if ((currentChallenge.distance > previousChallenge.distance)) {
                    // Update with new results
                    previousChallenge.distance = currentChallenge.distance;
                    previousChallenge.maxSpeed = currentChallenge.maxSpeed;
                    previousChallenge.events = currentChallenge.events;
                    previousChallenge.revolutionsEnded = currentChallenge.revolutionsEnded;
                    previousChallenge.revolutionsStarted = currentChallenge.revolutionsStarted;
                    previousChallenge.lastDistanceDiff = diff;
                    console.log('Better Result', currentChallenge.name, diff, currentChallenge.distance, previousChallenge.distance);
                    this.registry.save();
                    this.router.navigate('/results/' + previousChallenge.name);
                } else {
                    console.log('Weaker Result', currentChallenge.name, diff, currentChallenge.distance, previousChallenge.distance);
                    previousChallenge.lastDistanceDiff = diff;
                    this.router.navigate('/results/' + previousChallenge.name);
                }
            } catch (e) {
                // Save as new
                this.registry.add(payload.challenge);
                this.registry.save();
                console.log('New Result', currentChallenge.name, currentChallenge.distance, e);
                this.router.navigate('/results/' + payload.challenge.name);
            }
        });
    }
}
