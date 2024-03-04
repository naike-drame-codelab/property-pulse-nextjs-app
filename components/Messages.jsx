"use client";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch messages
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch("/api/messages");

                if (res.status === 200) {
                    const data = await res.json();
                    setMessages(data);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.log("Error fetching messages: ", error);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, []);

    return <div>Messages</div>;
};
export default Messages;
