import react from 'react';
import styles from '../styles/PasswordStrengthLevel.module.css'
import { passwordStrength } from 'check-password-strength'

export default class PasswordStrengthLevel extends react.Component {
    constructor(props) {
        super(props);
        this.levels = [
            'very weak',
            'weak',
            'medium',
            'strong',
        ];
        this.level = null;
    }
    render() {
        this.level = (this.props.password.length == 0 ? 0 : passwordStrength(this.props.password).id + 1) / 4;
        let text;
        if (this.props.text) {
            text = this.props.text;
            this.level = 0.2;
        }
        else {
            text = `Password is ${this.level == 0 ?
                'empty' :
                this.levels[Math.round((this.levels.length - 1) * this.level)]
                }`;
        }


        return (
            <div id={styles.root} style={{ '--password-strength-level-color': `rgba(255, 255, 255, ${0.15 + this.level * 0.85})` }}>
                <div>
                    {text}
                </div>
            </div>
        )
    }
}