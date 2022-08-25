import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Tes = () => {
  const [loading, setLoading] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [image, setImage] = React.useState(null);

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const img = e.target.files[0];
      // convert img to blob
      const blob = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(img);
      });
      const now = Date.now() + img.size;
      const data = await axios.put(
        `https://hamidhamrichatapp.blob.core.windows.net/chatapp/${now}.jpg?sp=acw&st=2022-08-25T21:06:19Z&se=2022-08-26T05:06:19Z&sv=2021-06-08&sr=c&sig=4ym7F%2BnQfV1%2FYsnNVBXal3QiAOPb7DbsMffNvIlPvb4%3D`,
        blob,
        {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": "image/jpeg",
          },
        }
      );
      setImage(
        `https://hamidhamrichatapp.blob.core.windows.net/chatapp/${now}.jpg`
      );
    }
  };
  console.log(image);

  return (
    <>
      {loading && <p>...loading</p>}
      {data.length > 0 && <p>...data</p>}
      <input onChange={handleImageChange} type="file" />
      <img
        src={
          "hamidhamrichatapp.blob.core.windows.net/chatapp/1661468933842.jpg"
        }
      />
    </>
  );
};

export default Tes;
