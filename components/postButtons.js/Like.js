import react from "react";
import PostButton from "../PostButton";
import styles from '../../styles/LikePostButton.module.css'

function LikeSVG({ classNames = [], contentAttrs = {} } = {}) {
    return (
        <svg className={classNames.join(' ')} key='0' width="22" height="27" viewBox="0 0 22 27" xmlns="http://www.w3.org/2000/svg" {...contentAttrs}>
            <path d="M11.2094 14C16.5108 14 19.0898 14 20.0898 14M20.0898 14C21.0898 14 21.0898 18 20.0898 18M20.0898 14C21.0898 14 21.0898 10 20.0898 10C19.0898 10 7.5 10 7 10C6.5 10 6.58984 8.50001 8.08984 5.00001C9.58984 1.50001 8.08984 1 6.58984 1C5.08984 1 1.08984 9.50006 1.08984 12.5001C1.08984 15.5001 1.08984 26 1.08984 26C1.08984 26 18.0898 26 19.0898 26C20.0898 26 21.0898 22 20.0898 22M11.2094 18C15.5469 18 19.0898 18 20.0898 18M20.0898 22C19.0898 22 14.583 22 11.2094 22M20.0898 22C21.0898 22 21.0898 18 20.0898 18" stroke="#A9A9A9" strokeWidth="2" />
        </svg>
    );
}


export default class LikePostButton extends PostButton {
    constructor(props) {
        super(props);
        this.content = [
            <LikeSVG></LikeSVG>
        ];
        this.staticContent = [];
        this.ghostsRefs = [];
        this.runAnimation = true;
        for (let i = 0; i < 15; i++) {
            this.ghostsRefs.push(react.createRef());
            this.staticContent.push(<LikeGhost ref={this.ghostsRefs[i]}></LikeGhost>);
        }
    }
    async onClick() {
        super.onClick?.();
        if (this.isActivated || !this.runAnimation) return;
        this.runAnimation = false;
        let promises = [];
        for (let ghostRef of this.ghostsRefs) {
            promises.push(ghostRef.current.launch({ speed: Math.random() * 0.05, angle: Math.random() * 2 * Math.PI }));
        }
        await Promise.all(promises);
        this.runAnimation = true;
    }
}


class LikeGhost extends react.Component {
    constructor() {
        super();
        this.lifetime = 500; //ms
        this.gravity = 0.0001; // rem/ms
        this.state = {
            style: {
                bottom: 0,
                left: null,
                right: null,
                opacity: 0
            }
        };
    }
    launch({ speed = 0.05, angle = Math.PI / 3 } = {}) {
        return new Promise(((resolve) => {
            if (angle < Math.PI / 2) {
                this.setState({
                    style: {
                        left: 0,
                        right: null
                    }
                });
            }
            else {
                this.setState({
                    style: {
                        left: null,
                        right: 0
                    }
                });
            }
            let speeds = {
                x: speed * Math.cos(angle),
                y: speed * Math.sin(angle)
            }
            if (angle > Math.PI) {
                speeds.y *= -1;
            }
            let animationStart = performance.now();
            (function drawFrame(time) {
                let timeDifference = time - animationStart;
                let timeFraction = timeDifference / this.lifetime;
                if (timeFraction > 1) {
                    timeFraction = 1;
                }
                let stateStyleChanges = {
                    opacity: 1 - timeFraction
                };
                let xPositionAbs = timeDifference * speeds.x;
                if (this.state.style.left !== null) {
                    stateStyleChanges.left = xPositionAbs + 'rem';
                } else {
                    stateStyleChanges.right = xPositionAbs + 'rem';
                }
                stateStyleChanges.bottom = timeDifference * (speeds.y - this.gravity * timeDifference / 2) + 'rem';
                this.setState({
                    style: stateStyleChanges
                });
                if (timeFraction < 1) {
                    requestAnimationFrame(drawFrame.bind(this));
                }
                else { resolve(); }
            }).call(this, animationStart);
        }).bind(this));
    }
    render() {
        return <LikeSVG classNames={[styles.ghost]} contentAttrs={{ style: this.state.style }}></LikeSVG>
    }
}