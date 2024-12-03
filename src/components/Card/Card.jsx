import style from './Card.module.css'
import placeHolder from '../../assets/placeholder.webp'
import trashCan from '../../assets/cestino-chiuso.png'

export default function Card({ title = '', content = '', tags = [], image = '', onDelete = () => { } }) {


    const getTagClass = (tag) => {
        switch (tag.toLowerCase()) {
            case 'html':
                return style.orange
            case 'css':
                return style.blue
            case 'js':
                return style.yellow
            case 'php':
                return style.green
        }
    };

    return (
        <div className={style.card}>
            <div>
                <img className={style.image} src={image || placeHolder} alt="" />
                <div className={style.contentContainer}>
                    <div className={style.title}>{title}</div>
                    <div className={style.tags}>
                        {tags.map((tag, index) => (
                            <div key={index} className={style.tags}>
                                <div className={getTagClass(tag)}>
                                    {tag}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={style.text}>{content}</div>
                    <div className={style.footerCard}>
                        <div className={style.button}>Leggi di più</div>

                        <div className={style.trash}>
                            <img onClick={onDelete} src={trashCan} alt="" />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}