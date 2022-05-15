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
    const a = {
        name: 'sharel',
        private: true,
        scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint',
        },
        dependencies: {
            '@prisma/client': '^3.8.1',
            ajv: '^8.9.0',
            'check-password-strength': '^2.0.3',
            jsonwebtoken: '^8.5.1',
            next: '^12.0.8',
            react: '17.0.2',
            'react-dom': '17.0.2',
            'request-ip': '^2.1.3',
        },
        devDependencies: {
            eslint: '8.4.1',
            'eslint-config-next': '^0.2.4',
            prisma: '^3.8.1',
        },
    };
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
                    <div className={styles.method}>
                        <div className={styles.header}>
                            <h3>{props.name}</h3>
                            <CodeInline>{methodPath}</CodeInline>
                            <CodeInline>{props.httpMethod}</CodeInline>
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

    addSection('Signing up', null, [
        <Method httpMethod="POST" name="sign_up" />,
    ]);

    addSection('Profile', '/profile/', [
        <Method
            httpMethod="POST"
            name="get_me"
            responseDataExample={{ username: 'your username' }}
        ></Method>,
        <Method
            httpMethod="POST"
            name="get_session"
            responseDataExample={{
                sesions: [
                    {
                        ipAddress: '191.80.1.100',
                        lastUsedTimestamp: 10034032,
                        userAgent: 'Gecko 1.1 Chromium x86',
                    },
                    {
                        ipAddress: '122.11.93.8',
                        lastUsedTimestamp: 100340898,
                        userAgent: 'Android Web View 4.1',
                    },
                ],
            }}
        />,
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
