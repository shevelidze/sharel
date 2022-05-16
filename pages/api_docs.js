import hljs from 'highlight.js';
import 'highlight.js/styles/nnfx-dark.css';
import styles from '../styles/ApiDocs.module.css';
import React from 'react';

function CodeInline(props) {
    return <code className={styles.code}>{props.children}</code>;
}

function CodeBlock(props) {
    return (
        <pre
            className={styles.code}
            style={{ marginBottom: '1em' }}
            dangerouslySetInnerHTML={{ __html: props.code }}
        />
    );
}

const MethodPrefixContext = React.createContext(null);

function Section(props) {
    return (
        <div className={styles.section} id={props.name}>
            <div className={styles.header}>
                <h2>{props.name}</h2>
                {props.prefix && <CodeInline>{props.prefix}</CodeInline>}
            </div>
            <MethodPrefixContext.Provider value={props.prefix}>
                {props.children}
            </MethodPrefixContext.Provider>
        </div>
    );
}

function getHighlightedJSON(o) {
    return hljs.highlight(JSON.stringify(o, null, 4), { language: 'json' })
        .value;
}

function Method(props) {
    return (
        <MethodPrefixContext.Consumer>
            {(prefix) => {
                let methodPath = props.name;
                if (prefix && !props.isNotUsingPrefix) {
                    methodPath = prefix + methodPath;
                }
                if (methodPath[0] !== '/') methodPath = '/' + methodPath;
                return (
                    <div className={styles.method} id={methodPath}>
                        <div className={styles.header}>
                            <h3>{props.name}</h3>
                            <CodeInline>{methodPath}</CodeInline>
                            <CodeInline>
                                {props.httpMethod || 'POST'}
                            </CodeInline>
                            {!props.authorizationIsNotRequired && (
                                <span style={{ fontStyle: 'italic' }}>
                                    Authorization required
                                </span>
                            )}
                        </div>
                        {props.children && [
                            <h4>Description</h4>,
                            <div>{props.children}</div>,
                        ]}
                        {props.requestDataExample && [
                            <h4>Request data example</h4>,
                            <CodeBlock
                                code={getHighlightedJSON(
                                    props.requestDataExample
                                )}
                            />,
                        ]}
                        {props.responseDataExample && [
                            <h4>Response data example</h4>,
                            <CodeBlock
                                code={getHighlightedJSON(
                                    props.responseDataExample
                                )}
                            />,
                        ]}
                        {props.possibleErrors && [
                            <h4>Possible errors</h4>,
                            <table>
                                <tr>
                                    <th>Error</th>
                                    <th>Description</th>
                                </tr>
                                {props.possibleErrors.map((errorObject) => (
                                    <tr key={errorObject.error}>
                                        <td>
                                            <CodeInline>
                                                {errorObject.error}
                                            </CodeInline>
                                        </td>
                                        <td>{errorObject.description}</td>
                                    </tr>
                                ))}
                            </table>,
                        ]}
                    </div>
                );
            }}
        </MethodPrefixContext.Consumer>
    );
}

export default function ApiDocs(props) {
    const sectionsList = [];
    const sectionsAnchorsList = [];
    function addSection(name, prefix, methods) {
        sectionsList.push(
            <Section key={name} name={name} prefix={prefix}>
                {methods}
            </Section>
        );
        sectionsAnchorsList.push(
            <li key={name}>
                <a href={'#' + name}>{name}</a>
            </li>
        );
    }

    addSection('Signing up and signing in', null, [
        <Method
            httpMethod="POST"
            name="sign_up"
            requestDataExample={{
                firstName: 'David',
                lastName: 'Johnson',
                email: 'djohnson@gmail.com',
                password: 'qwerty123',
            }}
            authorizationIsNotRequired={true}
            possibleErrors={[
                {
                    error: 'emailHasTaken',
                    description:
                        'User with such email has been already registererd.',
                },
            ]}
        />,
        <Method
            httpMethod="POST"
            name="verify_email"
            requestDataExample={{
                email: 'djohnson@gmail.com',
                verificationCodeFromEmail: '12212',
            }}
            authorizationIsNotRequired={true}
            possibleErrors={[
                { error: 'wrongCode' },
                { error: 'emailNotFound' },
            ]}
        >
            After sending registration data useing method{' '}
            <a href="#/sign_up">sign_up</a>, users should comnfirm their emails
            with code, that will be sended to their emails.
        </Method>,
        <Method
            httpMethod="POST"
            name="sign_in"
            requestDataExample={{
                email: 'djohnson@gmail.com',
                password: 'qwerty123',
            }}
            authorizationIsNotRequired={true}
            possibleErrors={[
                {
                    error: 'wrongUserData',
                    description: 'Wrong email or password.',
                },
            ]}
        />,
    ]);

    addSection('Profile', '/profile/', [
        <Method
            httpMethod="POST"
            name="get"
            responseDataExample={{
                firstName: 'First name',
                lastName: 'Last name',
                id: 3,
            }}
        ></Method>,
        <Method
            httpMethod="POST"
            name="get_sessions"
            responseDataExample={{
                sesions: [
                    {
                        accessTokenHash:
                            '94iQY+PvcZ8V0joSgOzWfA/a2KiulvWXbx183yly01A=',
                        ipAddress: '191.80.1.100',
                        lastUsedTimestamp: '2022-05-16T15:20:01.805Z',
                        userAgent: 'Gecko 1.1 Chromium x86',
                    },
                    {
                        accessTokenHash:
                            'cslBLON9Rp10n0RRqFfm8ksAG13SFkIm0ySXpsrLCNk=',
                        ipAddress: '122.11.93.8',
                        lastUsedTimestamp: '2022-05-16T15:23:11.805Z',
                        userAgent: 'Android Web View 4.1',
                    },
                ],
            }}
        />,
        <Method
            name="close_session"
            requestDataExample={{
                accessTokenHash: '94iQY+PvcZ8V0joSgOzWfA/a2KiulvWXbx183yly01A=',
            }}
        >
            Close your user's session by accessTokenHash.
        </Method>,
    ]);

    addSection('Posts', '/posts/', [
        <Method
            name="get_ids"
            responseDataExample={{ ids: [12, 21, 33, 67, 99] }}
        >
            This method is used to get identities of posts, that have been
            published by people, that your user subscribed for.
        </Method>,

        <Method
            name="get"
            requestDataExample={{ id: 3844 }}
            responseDataExample={{
                id: 3844,
                content: 'Something long.',
                author: { firstName: 'Donald', lastName: 'Trump', id: 4421 },
                likesNumber: 123,
                hasMyLike: true,
            }}
        />,
        <Method
            name="add_comment"
            requestDataExample={{
                post_id: 1212,
                comment:
                    "You have nice skills to write something! Don't stop, and you will be famous.",
            }}
        />,
        <Method name="delete_comment" requestDataExample={{ id: 9434 }}>
            Able to delete only conmments which have been added by your user.
        </Method>,
        <Method name="like" requestDataExample={{ id: 9434 }}>
            This method is used to like post, and remove like, if user have
            already put it.
        </Method>,
        <Method name="dislike" requestDataExample={{ id: 9434 }}>
            This method is used to dislike post, and remove dislike, if user
            have already put it.
        </Method>,
    ]);

    addSection("Your user's posts", '/my_posts/', [
        <Method
            name="create"
            requestDataExample={{ content: 'Something long.' }}
        />,
        <Method
            name="get_ids"
            responseDataExample={{ ids: [33, 141, 400, 902] }}
        >
            This method is used to get identities of posts, that have been
            published by your user.
        </Method>,
        <Method
            name="edit"
            requestDataExample={{
                id: 33,
                newContent: 'Another something long.',
            }}
        />,
        <Method name="delete" requestDataExample={{ id: 141 }} />,
    ]);
    return (
        <div id={styles.content}>
            <h1>REST api docs</h1>
            <div id={styles.sections}>
                <h2>Sections</h2>
                <ul>{sectionsAnchorsList}</ul>
            </div>
            <div id={styles.docs}></div>
            {sectionsList}
        </div>
    );
}
