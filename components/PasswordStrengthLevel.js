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
        ]
    }
    render() {
        let level = (this.props.password.length == 0 ? 0 : passwordStrength(this.props.password).id + 1) / 4;
        return (
            <div id={styles.root} style={{ '--password-strength-level-color': `rgba(255, 255, 255, ${0.15 + level * 0.85})` }}>
                <div>{`Password is ${level == 0 ?
                        'empty' :
                        this.levels[Math.round((this.levels.length - 1) * level)]
                    }`}
                </div>
            </div>
        )
    }
}