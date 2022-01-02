import react from "react";
import styles from '../styles/Input.module.css'
import Button from '../components/Button.js'

export default class Input extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonIsHidden: false
        };
        this.buttonRef = react.createRef();
    }
    async blink(times) {
        let component = this;

        async function blinkOneTime() {
            let fadeDuration = 300; // ms
            let startRGB = [255, 255, 255];
            let finishRGB = [94, 94, 94];

            let animationStart = performance.now();
            return new Promise(
                (resolve) => {
                    requestAnimationFrame(
                        function drawAnimationFrame(time) {
                            let timeFraction = (time - animationStart) / fadeDuration;
                            if (timeFraction > 1) timeFraction = 1;

                            function getChannelValue(index) {
                                return startRGB[index] + (finishRGB[index] - startRGB[index]) * timeFraction;
                            }

                            component.setState({ color: `rgb(${getChannelValue(0)}, ${getChannelValue(1)}, ${getChannelValue(2)})` });

                            if (timeFraction < 1) requestAnimationFrame(drawAnimationFrame);
                            else {
                                component.setState({ color: undefined });
                                resolve();
                            }
                        }
                    )
                }
            );
        };

        for (let i = 0; i < times; i++) {
            await blinkOneTime();
        }
    }
    render() {
        let buttonComponent = (
            <div>
                <Button {...this.props.buttonProps} ref={this.buttonRef} displayNoneOnDisabled={true}></Button>
            </div>
        );
        return (
            <div
                id={styles.root}
                className={this.state.buttonIsHidden ? styles['hidden-button'] : ''}
            >
                <input
                    id={styles.input}
                    style={this.state.color == undefined ? null : { '--decoration-color': this.state.color, transition: 'none' }}
                    placeholder={this.props.placeholder}
                    autocomplete={this.props.autoComplete === undefined ? 'off' : this.props.autoComplete}
                    type={this.props.type === undefined ? 'text' : this.props.type}
                    onBlur={this.onBlur()}
                ></input>

                {
                    this.props.buttonProps !== undefined ? buttonComponent : null
                }
            </div>
        );
    }



    onBlur() {
        return async () => {
            setTimeout(() => { this.blink(3); }, 2000);
            await this.buttonRef.current.disable();
            this.setState({ buttonIsHidden: true })
        };

    }
}