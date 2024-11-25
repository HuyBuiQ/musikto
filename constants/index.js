import {
  Home,
  Explore,
  AddPhotoAlternateOutlined,
  GroupOutlined,
  BookmarksOutlined,
  PeopleOutlineOutlined,
  FavoriteBorder,
  ExploreOutlined,
  ChatOutlined,
  FavoriteBorderOutlined
} from "@mui/icons-material";

export const sidebarLinks = [
  {
    icon: <Home sx={{ color: "black", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <AddPhotoAlternateOutlined sx={{ color: "black", fontSize: "26px" }} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <PeopleOutlineOutlined sx={{ color: "black", fontSize: "26px" }} />,
    route: "/followed",
    label: "Followed",
  },
  
  {
    icon: <FavoriteBorderOutlined sx={{ color: "black", fontSize: "26px" }} />,
    route: "/liked-posts",
    label: "Liked Post",
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
    title: "M-Feed",
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
  },
  {
    url: "/followed",
    title: "Followed",
  },
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
