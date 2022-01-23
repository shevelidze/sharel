import PostButton from "../PostButton";

export default class CommentPostButton extends PostButton {
    constructor() {
        super();
        this.content = (
            <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.08984 3V18C1.08984 19 2.08984 20 3.08984 20H6.08984V26L14.0898 20H28.0898C29.0898 20 30.0898 19 30.0898 18V3C30.0898 2 29.0898 1 28.0898 1L3.08984 1C2.08984 1 1.08984 2 1.08984 3Z" stroke="#A9A9A9" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        );
    }
}