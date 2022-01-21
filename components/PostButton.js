import react from 'react'
import styles from '../styles/PostButton.module.css'

export default class PostButton extends react.Component {
    constructor(props) {
        super(props);
        this.content = <div>Post button</div>;
        this.state = {
            classNames: [styles.root]
        };
    }
    onClick() {
        this.props.onClick?.(this.isActivated, this.activate.bind(this), this.deactivate.bind(this))
    }
    get isActivated() {
        return this.state.classNames.indexOf(styles.activated) !== -1;
    }
    activate() {
        if (!this.isActivated) {
            this.setState({
                classNames: [...this.state.classNames, styles.activated]
            });
        }
    }
    deactivate() {
        let activatedClassIndex = this.state.classNames.indexOf(styles.activated) !== -1;
        if (activatedClassIndex !== -1) {
            let newClassNames = [...this.state.classNames];
            newClassNames.splice(activatedClassIndex, 1);
            this.setState({
                classNames: newClassNames
            });
        }
    }
    render() {
        return [
            <div
                className={this.state.classNames.join(' ')}
                onClick={this.onClick.bind(this)}
            >{this.content}</div>,
            this.staticContent
        ];
    }
}