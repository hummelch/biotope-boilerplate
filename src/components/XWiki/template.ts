import * as styles from './styles.scss';

interface XWikiTemplateData {
    items: any
}

export default (render: Function, data: XWikiTemplateData) => {
    const displayTitle = () => {
        if(!data.items.data.length) {
            return data.items.data.funnyNewsCollection.items[0].title;
        }
    }
    return render`
        <style>${styles.toString()}</style>
        <div>
         ${displayTitle()}
        </div>
    `;
}