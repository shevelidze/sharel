import react from "react";
import styles from '../styles/Input.module.css'

export default class Input extends react.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        return (
            <div id={styles.root}>
                <input
                    id={styles.input}
                    style={this.state.color == undefined ? null : { '--decoration-color': this.state.color, transition: 'none' }}
                    placeholder={this.props.placeholder}
                    autocomplete={this.props.autoComplete === undefined ? 'off' : this.props.autoComplete}
                    onBlur={this.onBlur()}
                ></input>
                {
                    this.props.buttonClicked !== undefined ?
                        <div id={styles.button} onClick={this.props.buttonClicked}><div>Button</div></div> :
                        null
                }
            </div>
        );
    }

    onBlur()
    {
        let component = this;
        return () => {
            setTimeout(() => { component.blink(3); }, 2000);
        };
    }
}