import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

const WebsiteFooter = () => {
    return (
        <div className=''>
        <Footer
            columns={[
                {
                    title: 'Team',
                    items: [
                        {
                            title: 'Juan Cabrera',
                            url: 'https://github.com/juanedcabrera',
                            openExternal: true,
                        },
                        {
                            title: 'Myles Wiegel',
                            url: 'https://github.com/mylesw27',
                            openExternal: true,
                        },
                    ],
                },
                {
                    title: 'Support',
                    items: [
                        {
                            title: 'Suggestions',
                            url: 'https://forms.gle/y6CVPK57zajhcK3t7',
                            openExternal: true,
                        },
                        {
                            title: 'Bug Report',
                            url: 'https://github.com/juanedcabrera/gaming-website/issues/new',
                            openExternal: true,
                        },
                        {
                            title: 'Work on Github Issues',
                            url: 'https://github.com/juanedcabrera/gaming-website/issues',
                            openExternal: true,
                        },
                    ],
                },
            ]}
        />
        </div>
    );
}

export default WebsiteFooter;
