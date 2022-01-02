import styles from '../styles/Button.module.css'
import react from 'react';

export default class Button extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                opacity: 1
            }
        }
    }
    disable() {
        return new Promise(
            (resolve) => {
                let animationStart;
                let drawAnimationFrame = (time) => {
                    let timeFraction = (time - animationStart) / 500;
                    if (timeFraction > 1) timeFraction = 1;
                    this.setState({ styles: { opacity: 1 - timeFraction } });
                    if (timeFraction < 1) requestAnimationFrame(drawAnimationFrame);
                    else {
                        let newStyles = {
                            cursor: 'initial',
                            'pointer-events': 'none',
                            opacity: '0'
                        };
                        this.setState({ styles: newStyles });
                        resolve();
                    }
                }
                animationStart = performance.now();
                requestAnimationFrame(drawAnimationFrame);
            }
        )
    }
    render() {
        let className = '';
        if (this.props.isClickable || this.props.isClickable === undefined) {
            className += ' ' + styles.clickable;
        }
        if (this.props.isDisabled) {
            className += ' ' + styles.disabled;
        }
        return (
            <div
                onClick={this.props.onClick}
                id={styles.root}
                className={className}
                style={this.state.styles}
            >
                <span> {this.props.text}</span>
            </div>
        );
    }
}