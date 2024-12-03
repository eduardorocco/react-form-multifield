import style from './Main.module.css'
import Card from "../Card/Card"
import { posts } from '../../data/posts'
import { useState } from 'react'

export default function Main() {
    const [publishedPosts, setPublishedPosts] = useState(posts.filter((post) => post.published === true))
    const [title, setTitle] = useState('')

    function addPost(event) {
        event.preventDefault()

        const newTitle = title
        if (newTitle === '') return

        const post = {
            id: Date.now(),
            title: newTitle,
            image: undefined,
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, repudiandae.',
            tags: [],
            published: true
        }

        setPublishedPosts([...publishedPosts, post])
        setTitle('')
    }

    function deletePost(id) {

        setPublishedPosts(publishedPosts.filter(post => post.id !== id))
    }

    return (
        <main>
            <div className="container">
                <form onSubmit={addPost} action="">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Titolo del post"
                    />
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
