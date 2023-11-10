import { ILike, QueryFailedError} from "typeorm";
import { Article, Content, Video } from "../db/entities/Content";
import { Media } from "../db/entities/Media";

// const getAllContent = () => {
//     try {
//         const content = Content.find();
//         return content;
//     } catch (error) {
//         throw ("Something went wrong");
//     }
// };


// const getAllContent = async (searchTerm?: string, mediaTypeFilter?: string, page = 1, pageSize = 10) => {
//   try {
//       let queryBuilder = Content.createQueryBuilder("content");

//       // Search
//       if (searchTerm) {
//           queryBuilder = queryBuilder.where("content.title LIKE :searchTerm", { searchTerm: `%${searchTerm}%` });
//       }

//       // Filter by media type
//       if (mediaTypeFilter) {
//           queryBuilder = queryBuilder.innerJoinAndSelect("content.media", "media", "media.type = :mediaTypeFilter", { mediaTypeFilter });
//       }

//       // Pagination
//       queryBuilder = queryBuilder.skip((page - 1) * pageSize).take(pageSize);

//       // Get paginated result and total count
//       const [content, totalCount] = await queryBuilder.getManyAndCount();

//       return { content, totalCount };
//   } catch (error) {
//       throw new Error("Failed to fetch content: " + error);
//   }
// };

const createContent = async (payload: Content) => {
    try {
        // Create a new content item based on the payload
        const newContent = Content.create(payload);
        // Save the new content item to the database
        await newContent.save();

        return newContent; // Return the newly created content
    } catch (error) {
        throw ('Failed to create content: ' + error);
    }
};

const createVideo = async (payload: Video) => {
  
    try {
       
        const video = Video.create(payload);
       
        await video.save();
        console.log("here is worke ");
        return video; // Return the newly created video
      } catch (error) {
        console.error('Error creating video:', error);
        if (error instanceof QueryFailedError) {
            return {
                status: 400,
                message: 'Database error: ' + error.toString()
            };
        } else {
            return {
                status: 500,
                message: 'Failed to create video: ' + (error as Error).toString()
            };
        }
    }
};

  const createArticle = async (payload: Article) => {
    try {
      const article = Article.create(payload);
      await article.save();
      return article;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw ('Database error: ' + error.toString());
      } else {
        throw 'Failed to create video: ' + (error as Error).toString();      }
    }
  };
  

  async function getAllArticles() {
    try {
      const articles = await Article.find();
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Failed to retrieve articles');
    }
  }
  async function getAllVideos() {
    try {
      const videos = await Video.find();
      return videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw new Error('Failed to retrieve videos');
    }
  }
  const incrementLikes = async (content: { getContentId?: () => any; }) => {
    try {
      if (!content || !content.getContentId) {
        throw 'Invalid content object or missing getContentId method';
      }
  
      // Get the content ID using the getContentId method
      const contentId = content.getContentId();
      
      if (!contentId) {
        throw 'Content ID is missing or invalid';
      }
      
      // Find the content by its ID
      const foundContent = await Content.findOne(contentId);
  
      if (!foundContent) {
        throw 'Content not found';
      }
  
      // Increment the likes
      foundContent.likes++;
  
      // Save the updated content to the database
      await foundContent.save();
  
      return foundContent;
    } catch (error) {
      throw `Failed to increment likes: ${error}`;
    }
    
  };
  


const getAllMedia = async () => {
  try {
    const media = await Media.find();
    return media;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateMedia = async (id: string, payload: Media) => {
    try {
        const mediaToUpdate = await Media.findOne({  where: {id:(id)}  }  );
        if (mediaToUpdate) {
            Object.assign(mediaToUpdate, payload);
            await mediaToUpdate.save();
            return mediaToUpdate;
        } else {
            throw ("Media not found");
        }
    } catch (error) {
        throw ("Failed to update media: " + error);
    }
};

const deleteMedia = async (id: string) => {
    try {
        const mediaToDelete = await Media.findOne({  where: {id:(id)}  }  );
        if (mediaToDelete) {
            await Media.remove(mediaToDelete);
        } else {
            throw ("Media not found");
        }
    } catch (error) {
        throw ("Failed to delete media: " + error);
    }
};


const getAllContent = async (
  searchTerm?: string,
  mediaTypeFilter?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
      const queryBuilder = Content.createQueryBuilder("content");

      // Advanced search logic
      if (searchTerm) {
          queryBuilder.where([
              { title: ILike(`%${searchTerm}%`) },
              { description: ILike(`%${searchTerm}%`) },
              { tags: ILike(`%${searchTerm}%`) }
          ]);
      }

      // Filter by media type
      if (mediaTypeFilter) {
          queryBuilder.andWhere("content.mediaType = :mediaTypeFilter", { mediaTypeFilter });
      }

      // Add pagination
      queryBuilder
          .skip((page - 1) * pageSize)
          .take(pageSize);

      const [contents, total] = await queryBuilder.getManyAndCount();

      return {
          data: contents,
          total,
          page,
          totalPages: Math.ceil(total / pageSize)
      };
  } catch (error) {
      console.error("Error fetching content:", error);
      throw new Error("Failed to fetch content");
  }
};


// const getAllContent = (searchTerm?: string, mediaTypeFilter?: string, page = 1, pageSize = 10) => {
//     try {
//         let queryBuilder = Content.createQueryBuilder("content");

//         // Search
//         if (searchTerm) {
//             queryBuilder = queryBuilder.where("content.title LIKE :searchTerm", { searchTerm: `%${searchTerm}%` });
//         }

//         // Filter by media type
//         if (mediaTypeFilter) {
//             queryBuilder = queryBuilder.innerJoinAndSelect("content.media", "media", "media.type = :mediaTypeFilter", { mediaTypeFilter });
//         }

//         // Pagination
//         const content = queryBuilder
//             .skip((page - 1) * pageSize)
//             .take(pageSize)
//             .getMany();

//         return content;
//     } catch (error) {
//         throw ("Something went wrong");
//     }
// };




export{deleteMedia,updateMedia,getAllMedia,incrementLikes,getAllVideos,
  getAllArticles,createArticle,createVideo,createContent,getAllContent
}