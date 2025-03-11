import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { setLoading } from "../redux/authSlice";

export const CreateBlog = () => {
    const { token, loading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()
    console.log(token);
    const [blogTitle, setBlogTitle] = useState("");
    const [blogDesc, setBlogDes] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        dispatch(setLoading(true))
        const res = await axios.post(
            "http://localhost:4000/api/v1/create-blog",
            { blogTitle, blogDesc },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res.data);
        dispatch(setLoading(false))
        navigate('/blog/myBlogs')
    };
    useEffect(() => {
        if (!token) {
            navigate("/");
            toast("Please Login First");
            return;
        }
    }, []);
    return (
        <div className="flex justify-center items-center h-screen flex-col broder-2 rounded-md px-10 py-5">
            <Card className="w-4xl px-10 py-6">
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription>
                        Enter title and Description
                    </CardDescription>
                </CardHeader>
                <Input
                    type="text"
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter Title here"
                />
                <Textarea
                    onChange={(e) => setBlogDes(e.target.value)}
                    placeholder="Enter Description here"
                    className="h-56"
                />
                <Button disabled={loading} onClick={handleSubmit}>{loading? 'Creating....' : 'Submit'}</Button>
            </Card>
        </div>
    );
};
