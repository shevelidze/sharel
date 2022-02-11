import react from 'react';
import styles from '../styles/PasswordStrengthLevel.module.css'
import { passwordStrength } from 'check-password-strength'

class PasswordStrengthLevel extends react.Component {
    constructor(props) {
        /*
        used props: 
        - level
        - text
        */
        super(props);
    }
    render() {
        let defaultProps = getPropsForLevel('', '');
        return (
            <div
                id={styles.root}
                style={{ '--password-strength-level-color': `rgba(255, 255, 255, ${0.15 + (this.props?.level || defaultProps.level) * 0.85})` }}
            >
                <div>
                    {this.props?.text || defaultProps.text}
                </div>
            </div>
        )
    }
}

function getPropsForLevel(password1, password2) {
    let levels = [
        'very weak',
        'weak',
        'medium',
        'strong',
    ];
    let level, text;

    if (password1 !== password2) {
        level = 0.2;
        text = 'Passwords don\'t match!';
    } else if (password1?.length > 0) {
        level = (passwordStrength(password1).id + 1) / 4;
        text = `Password is ${levels[Math.round((levels.length - 1) * level)]}.`;
    } else {
        level = 0;
        text = 'Password is empty!';
    }
    return {
        level,
        text,
        passwordsAreRight: level >= 0.5
    };
}

export { PasswordStrengthLevel, getPropsForLevel }