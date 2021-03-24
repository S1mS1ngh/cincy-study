# server/app/api/crud.py

from typing import Union, List

from app.models.pydantic import Post_Pydantic, User_Pydantic, PostIn, UserIn, UserAuth
from app.models.tortoise import User, Post


async def create_user(payload: dict) -> User_Pydantic:
    user = User(
        username=payload['username'],
        email=payload['email'],
        password_hash=payload['password'],
        major=payload['major'],
        first_name=payload['first_name'],
        last_name=payload['last_name'],
        m_number=payload['m_number'],
    )
    await user.save()
    return user

async def get_user(username: str) -> Union[dict, None]:
    user = await User.filter(username=username).first().values()
    if user:
        return user[0]
    return None

async def create_post(payload: PostIn, current_user: UserAuth) -> Post_Pydantic:
    user = await User.get(username=current_user.username)
    post = Post(
        title=payload.title,
        content=payload.content,
        user=user
    )
    await post.save()
    return post

async def get_all_post() -> List[Post_Pydantic]:
    posts = await Post_Pydantic.from_queryset(Post.all())
    return posts