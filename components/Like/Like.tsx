import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { TbBrandFacebook, TbBrandTwitter, TbCopy } from 'react-icons/tb';
import { useToast } from '@/components/ui/use-toast';

interface Like {
  _id: string;
  user_id: User[];
  game_id: Game[];
  time: Date;
}

interface Game {
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
  likes: Like[];
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: any;
  _id: string;
  name: string;
  email: string;
  userName: string;
  avatar: string;
  bio: string;
  games: Game[];
}

export default function Like(props: { game: Game }) {
  const [theGame, setTheGame] = useState(props.game._id);
  const [user, setUser] = useState<User>();
  const [time, setTime] = useState<any>(null);
  const [like, setLike] = useState<any>(null);
  const [fetchedLikes, setFetchedLikes] = useState<any>(null);
  const token = localStorage.getItem('token') || '';
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (token) {
      const decoded: User = jwt_decode(token);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    if (user && theGame) {
      try {
        const response = fetch(`${apiUrl}/api-v1/like/${user.id}/${theGame}`)
          .then((response) => response.json())
          .then((data) => setLike(data.like));
      } catch (error) {
        console.error('Error fetching like:', error);
      }
    }
  }, [user, theGame]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api-v1/game/${theGame}`);
        if (!response.ok) {
          throw new Error('Failed to fetch likes');
        }
        const data = await response.json();
        setFetchedLikes(data.game.likes);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();
  }, [theGame]);

  const submitLike = () => {
    setTime(new Date().getTime());
    const response = fetch(`${apiUrl}/api-v1/like/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        user_id: user?.id,
        game_id: theGame,
        time: time,
      }),
    })
      .then((response) => response.json())
      .then((data) => setLike(data.like));
  };

  const deleteLike = () => {
    fetch(`${apiUrl}/api-v1/like/${like._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    setLike(null);
  };

  const { toast } = useToast();

  const copyLink = () => {
    const textField = document.createElement('textarea');
    textField.innerText = window.location.href;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast({
      title: 'Link Copied',
      description: "You're link has been copied to your clipboard.",
    });
  };

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center space-x-4">
          {like ? (
            <h1
              className="text-red-600 text-center absolute z-10"
              onClick={deleteLike}
            >
              <AiFillHeart />
            </h1>
          ) : (
            <h1
              className="text-red-600 text-center absolute z-10"
              onClick={submitLike}
            >
              <AiOutlineHeart />
            </h1>
          )}
          <p className="text-center pl-2 text-xs pb-3 absolute">
            {fetchedLikes?.length}
          </p>
        </div>
      ) : null}
      <FacebookShareButton url={window.location.href}>
        <button className="icon-button pl-2">
          <TbBrandFacebook className="icon" />
        </button>
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href}>
        <button className="icon-button">
          <TbBrandTwitter className="icon" />
        </button>
      </TwitterShareButton>
      <button className="icon-button" onClick={copyLink}>
        <TbCopy className="icon" />
      </button>
    </>
  );
}
