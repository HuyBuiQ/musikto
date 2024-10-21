import {
  Home,
  Explore,
  AddPhotoAlternateOutlined,
  GroupOutlined,
  BookmarksOutlined,
  FavoriteBorder,
  ExploreOutlined,
  ChatOutlined,
} from "@mui/icons-material";

export const sidebarLinks = [
  {
    icon: <Home sx={{ color: "black", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <ExploreOutlined sx={{ color: "black", fontSize: "26px" }} />,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: <AddPhotoAlternateOutlined sx={{ color: "black", fontSize: "26px" }} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <ChatOutlined sx={{ color: "black", fontSize: "26px" }} />,
    route: "/chat",
    label: "Chat",
  }
];

export const rightsidebarLinks = [
  
  {
    icon: <GroupOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <BookmarksOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/saved-posts",
    label: "Saved Posts",
  },
  {
    icon: <FavoriteBorder sx={{ color: "white", fontSize: "26px" }} />,
    route: "/liked-posts",
    label: "Liked Posts",
  },
];


export const pageTitles = [
  {
    url: "/",
    title: "MusikFeed",
  },
  {
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    url: "/create-post",
    title: "Create Post",
  },
  {
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    url: "/search", 
    title: "Search",
  },
  {
    url: "/search", 
    title: "Search",
  },
  {
    url: "/saved-posts",
    title: "Saved Posts",
  },
  {
    url: "/liked-posts",
    title: "Liked Posts",
  }
];

export const tabs = [
  {
    link: "posts",
    name: "Posts",
  },
  {
    link: "followers",
    name: "Followers",
  },
  {
    link: "following",
    name: "Following",
  },
];
