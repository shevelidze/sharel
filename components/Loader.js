import styles from '../styles/Loader.module.css'
import react from 'react';

export default class Loader extends react.Component {
    constructor(props) {
        super(props);
        this.adjectives = [
            'engaging',
            'engrossing',
            'captivating',
            'fantastic',
            'gripping',
            'heart-warming',
            'hilarious',
            'imaginative',
            'powerful',
            'spellbinding',
            'alluring',
            'brilliant',
            'breathtaking',
            'dazzling',
            'elegant',
            'enchanting',
            'glowing',
            'lovely',
            'lustrous',
            'magnificent',
            'ravishing',
            'shining',
            'vivid',
            'vibrant',
            'vivacious'
        ];
        this.state = {
            animationWillEnd: false,
            word: this.getRandomAdjective(),
            wordOpacity: 0,
            isLogo: false,
            opacity: 1,
            display: 'block'
        }
    }
    getRandomAdjective() {
        return this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    }
    createAdjectiveChangeAnimation(mainAnimationDuration, beforeFinishAnimationDuration, finishAnimationDuration, finishAnimationTimes) {
        let didTimes = 0;
        let component = this;
        function internalStartFinishAnimation() {
            let animationStart = performance.now();
            requestAnimationFrame(
                function drawFinishAnimation(time) {
                    let timeFraction = (time - animationStart) / finishAnimationDuration;
                    if (timeFraction > 1) timeFraction = 1;
                    component.setState({ wordOpacity: timeFraction });
                    if (timeFraction < 1) requestAnimationFrame(drawFinishAnimation);
                    else {
                        setTimeout(() => {
                            component.dissolve()
                        }, 500)
                    }
                }
            )
        }
        return function internalStartAnimation(duration) {
            let animationStart = performance.now();
            requestAnimationFrame(
                function drawMainAnimation(time) {
                    let timeFraction = (time - animationStart) / duration;
                    if (timeFraction > 1) timeFraction = 1;
                    component.setState({ wordOpacity: 1 - timeFraction });
                    if (timeFraction < 1) requestAnimationFrame(drawMainAnimation);
                    else {
                        if (!component.state.animationWillEnd || didTimes < finishAnimationTimes) {
                            let newWord = component.getRandomAdjective();
                            while (newWord === component.state.word) {
                                newWord = component.getRandomAdjective();
                            }
                            component.setState({ word: newWord });
                            if (component.state.animationWillEnd) {
                                didTimes++;
                                internalStartAnimation(beforeFinishAnimationDuration);
                            }
                            else {
                                internalStartAnimation(mainAnimationDuration);
                            }

                        }
                        else {
                            component.setState({ word: 'sharel', isLogo: true });
                            internalStartFinishAnimation();
                        }
                    }
                }
            )
        }
    }
    startAnimation() {
        this.createAdjectiveChangeAnimation(300, 500, 1000, 3)();
        let component = this;
        setTimeout(
            () => {
                component.setState({ animationWillEnd: true });
            },
            2000
        )
    }
    componentDidMount() {
        this.startAnimation();
    }
    dissolve() {
        let animationStart = performance.now();
        let component = this;
        requestAnimationFrame(
            function drawDisolveAnimation(time) {
                let timeFraction = (time - animationStart) / 500;
                if (timeFraction > 1) timeFraction = 1;
                component.setState({ opacity: 1 - timeFraction });
                if (timeFraction < 1) {
                    requestAnimationFrame(drawDisolveAnimation);
                }
                else {
                    component.setState({ display: 'none' });
                }
            }
        )
    }
    render() {
        return (
            <div id={styles.wrapper} style={{ opacity: this.state.opacity, display: this.state.display }}>
                <div className={this.state.isLogo ? ('logo ' + styles.logo) : undefined} style={{ opacity: this.state.wordOpacity }}>{this.state.word}</div>
            </div>
        );
    }
}