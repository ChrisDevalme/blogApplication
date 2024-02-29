import { useState, useEffect } from "react"
import CreateForm from "../../components/CreateForm/CreateForm"
import Blogs from "../../components/Blogs/Blogs"

export default function HomePage(props) {
    const [blogs, setblogs] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    // blogs
    useEffect(() => {
        // Gives us the blog data after component mounts
        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs()
                setblogs(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs()
    }, [])
    // checking the token & user in localStorage
    useEffect(() => {
        //Gives token back to user if page refreshes
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])
    return(
    <>
        <div>
            <h1>Welcome to the Liberty Blog</h1>
            {showCreate? <CreateForm createBlog={props.createBlog} user={props.user} token={props.token}/> : <></>}
            { blogs.length? <Blogs blogs={blogs}/> : 'Sorry No blogs created'}

        </div>
    </>
    )
}