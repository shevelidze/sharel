import react from 'react'
import CommentPostButton from '../components/postButtons/Comment';
import LikePostButton from '../components/postButtons/Like';

export default class Home extends react.Component {
    render() {
        return (
            <div>
                <LikePostButton onClick={
                    (a, b, c) => {
                        console.log(a);
                        console.log(c);
                        if (!a) {
                            b();
                        } else {
                            c();
                        }
                    }
                }></LikePostButton>
                <CommentPostButton/>
            </div >
        )
    }

}
