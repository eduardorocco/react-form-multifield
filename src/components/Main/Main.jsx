import style from './Main.module.css'
import Card from "../Card/Card"
import { posts } from '../../data/posts'
import { useState } from 'react'
import { useEffect } from 'react'


const initialFormData = {
    id: '',
    title: '',
    image: undefined,
    content: '',
    tags: [],
    published: true
}



export default function Main() {


    const [publishedPosts, setPublishedPosts] = useState(posts.filter((post) => post.published === true))

    const [formData, setFormData] = useState(initialFormData)

    function handleFormData(e) {

        const key = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        const newFormData = {
            ...formData,
            [key]: value,
        }

        setFormData(newFormData)

    }


    function addPost(event) {
        event.preventDefault()

        if (formData.title.trim() === '') return

        const newPost = {
            id: Date.now(),
            ...formData,
            tags: formData.tags.split(',').map((ing) => ing.trim())
        }

        setPublishedPosts([...publishedPosts, posts])

    }

    setPizzas([...pizzas,newPizza])
    

    function deletePost(id) {

        setPublishedPosts(publishedPosts.filter(post => post.id !== id))
    }

    return (
        <main>
            <div className="container">
                <form onSubmit={addPost}>
                    <input
                        type="text"
                        placeholder="Titolo del post"
                    />
                    <input type="text" placeholder='Contenuto' />
                    <input type="text" placeholder='Url immagine' />
                    <input type="text" placeholder='Tags' />
                    <input type="checkbox" />
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
