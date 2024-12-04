import style from './Main.module.css'
import Card from "../Card/Card"
import { posts } from '../../data/posts'
import { useState } from 'react'

const initialFormData = {
    id: '',
    title: '',
    image: '',
    content: '',
    tags: '',
    published: true
}

export default function Main() {
    const [publishedPosts, setPublishedPosts] = useState(posts.filter((post) => post.published === true))
    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e) {
        const key = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        setFormData({
            ...formData,
            [key]: value,
        });
    }

    function addPost(event) {
        event.preventDefault()


        if (formData.title.trim() === '') return


        const newPost = {
            id: Date.now(),
            ...formData,
            tags: formData.tags.split(',').map((tag) => tag.trim())
        };


        setPublishedPosts([...publishedPosts, newPost])


        setFormData(initialFormData)
    }

    function deletePost(id) {
        setPublishedPosts(publishedPosts.filter(post => post.id !== id))
    }

    return (
        <main>
            <div className="container">
                <form onSubmit={addPost}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titolo del post"
                        value={formData.title}
                        onChange={handleFormData}
                    />
                    <input
                        type="text"
                        name="content"
                        placeholder="Contenuto"
                        value={formData.content}
                        onChange={handleFormData}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Url immagine"
                        value={formData.image}
                        onChange={handleFormData}
                    />
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags"
                        value={formData.tags}
                        onChange={handleFormData}
                    />
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleFormData}
                    />
                    <label htmlFor="checkbox">Pubblica</label>
                    <input type="submit" />
                </form>
            </div>
            <div className="container">
                <div className={style.row}>
                    {publishedPosts.map((post) => (
                        <div key={post.id} className="col-6">
                            <Card
                                title={post.title}
                                content={post.content}
                                tags={post.tags}
                                image={post.image}
                                onDelete={() => deletePost(post.id)} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}


