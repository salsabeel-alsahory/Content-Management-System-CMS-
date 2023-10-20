import express from 'express';
import { createArticle, createCategory, createContent, createMedia, createPermission, createRole, createUser, createVideo, deleteCategory, deleteMedia, getAllArticles, getAllCategories, getAllContent, getAllMedia, getAllPermission, getAllRoles, getAllUsers, getAllVideos, login, updateCategory, updateMedia } from '../controllers/user.js';
import { Article, Content } from '../db/entities/Content.js';
import { Permission } from '../db/entities/Permission.js';
import { Role } from '../db/entities/Role.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorize.js';
import { loginValidationRules, signupValidationRules, validate } from '../middleware/validator.js';
const router = express.Router();

router.post("/signup", signupValidationRules(), validate, async (req:any, res:any) => {
  try {
    const { email, password, userName, displayName, role } = req.body;
    if (!email || !password || !userName || !displayName || !role) {
      return res.status(400).json({ error: "All fields required." });
    }
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/login", loginValidationRules(), validate, (req:any, res:any) => {
  if (req.body.email && req.body.password) {
    login(req.body.email, req.body.password).then((data) => {
      res.status(200).send(data)
    }).catch((error) => {
      res.status(400).send(error)
    })
  } else {
    res.status(404).send("email and password are required")
  }
})


router.get('/', authenticate, authorize('view_users'),(req, res, next) => {
  getAllUsers().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    res.status(404).send(error)
  })
});

/* POST permission. --------------------------------------------------------------------------------------------------*/


router.post('/permission',authorize('create_permission'), (req, res, next) => {
  try {
    createPermission(req.body)
    res.status(201).send("permission created successfully")
  } catch (error) {
    res.status(500).send("something went wrong")
  }
});



router.get('/permission', authenticate, authorize('view_permissions'),function (req, res, next) {
  getAllPermission().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});

// Define a route to update an existing permission
router.put('/permissions/:permissionId', authenticate,authorize('update_permission'), async (req, res) => {
  try {
    const permissionId = req.params.permissionId; // Get the permission ID from the URL

    // Find the permission by its ID in the database
    const permission = await Permission.findOne({ where: { id: permissionId } });

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    // Update permission properties with the request body
    if (req.body.name) {
      permission.name = req.body.name;
    }

    // Save the updated permission to the database
    await permission.save();

    res.status(200).json({ message: 'Permission updated successfully' });
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ error: 'Failed to update permission' });
  }
});


router.post('/role', authenticate, authorize('create_role'),(req, res, next) => {
  createRole(req.body).then(data => {
    res.status(201).send(data)
  }).catch(error => {
    res.status(500).send("something went wrong")
  })
});


router.get('/roles', authenticate,  authorize('view_roles'),function (req, res, next) {
  getAllRoles().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});

// Update an existing role
router.put('/roles/:roleId', authenticate,authorize('update_role'), async (req, res) => {
  try {
    const roleId = req.params.roleId; // This will take the ID from the URL

    // Find the role by its ID in the database
    const role = await Role.findOne({ where: { id: roleId } }); // Use FindOneOptions to specify the where clause

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Update role properties with the request body
    if (req.body.name) {
      role.name = req.body.name;
    }

    // Save the updated role to the database
    await role.save();

    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
});


router.get('/content', authenticate, authorize('view_content'),(req, res) => {
  getAllContent()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.post('/content', authenticate,authorize('create_content'), (req, res) => {
  createContent(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.put('/content/:contentId', authenticate,authorize('update_content'), async (req, res) => {
  try {
    const contentId = +req.params.contentId; // Convert the contentId to a number

    // Check if contentId is a valid number
    if (isNaN(contentId)) {
      return res.status(400).json({ error: 'Invalid contentId' });
    }

    // Find the content by its ID in the database
    const content = await Content.findOne({ where: { id: contentId } });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Update content properties with the request body
    const { title, content: newContent } = req.body;
    content.title = title || content.title;
    content.content = newContent || content.content;

    // Save the updated content to the database
    await content.save();

    res.status(200).json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Define a route to search for content
router.get('/content/search', authenticate,authorize('search_content'), async (req, res) => {
  try {
    // Get search criteria from the query parameters
    const { title, contentType } = req.query;

    // Create a filter object based on the provided criteria
    const filter: any = {};

    if (title) {
      filter.title = title;
    }

    if (contentType) {
      filter.contentType = contentType;
    }

    // Search for content in the database based on the filter criteria
    const content = await Content.find({ where: filter });

    res.status(200).json(content);
  } catch (error) {
    console.error('Error searching for content:', error);
    res.status(500).json({ error: 'Failed to search for content' });
  }
});


//-----------------------------------------------------------------

router.post('/article/create', authenticate,authorize('create_article'),async (req, res) => {
  try {
    const articleData = req.body; // Assuming the article data is in the request body
    const article = await createArticle(articleData);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

router.post('/videos', async (req, res) => {
  try {
    const videoData = req.body; // Assuming the video data is in the request body
    const video = await createVideo(videoData);
    res.status(201).json(video);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});
router.get('/videos', async (req, res) => {
  try {
    const videos = await getAllVideos(); // Define a function like getAllVideos to fetch all video entries
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to retrieve videos' });
  }
});
// router.post('/audio', authenticate, async (req, res) => {
//   try {
//     const audioData = req.body; // Assuming the audio data is in the request body
//     const audio = await createAudio(audioData);
//     res.status(201).json(audio);
//   } catch (error) {
//     console.error('Error creating audio:', error);
//     res.status(500).json({ error: 'Failed to create audio' });
//   }
// });

// router.get('/audio', authenticate, async (req, res) => {
//   try {
//     const audios = await getAllAudio(); // Define a function like getAllAudio to fetch all audio entries
//     res.status(200).json(audios);
//   } catch (error) {
//     console.error('Error fetching audio:', error);
//     res.status(500).json({ error: 'Failed to retrieve audio' });
//   }
// });


router.get('/articles', authenticate,authorize('view_articles'), async (req, res) => {
  try {
    const articles = await getAllArticles(); // Define a function like getAllArticles to fetch all article entries
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});
router.put('/articles/:articleId', authenticate, async (req, res) => {
  try {
    const articleId = +req.params.articleId; // Convert the articleId to a number

    // Check if articleId is a valid number
    if (isNaN(articleId)) {
      return res.status(400).json({ error: 'Invalid articleId' });
    }

    // Find the article by its ID in the database
    const article = await Article.findOne({ where: { id: articleId } });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Update article properties with the request body
    const { title, articleContent: newContent } = req.body;
    article.title = title || article.title;
    article.articleContent = newContent || article.articleContent;

    // Save the updated article to the database
    await article.save();

    res.status(200).json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});


// router.post('/content/like/:contentId', authenticate, async (req, res) => {
//   try {
//     const contentId = +req.params.contentId; // Convert the contentId to a number

//     // Check if contentId is a valid number
//     if (isNaN(contentId)) {
//       return res.status(400).json({ error: 'Invalid contentId' });
//     }

//     // Find the content by its ID in the database
//     const content = await Content.findOne({ where: { id: contentId } });

//     if (!content) {
//       return res.status(404).json({ error: 'Content not found' });
//     }

//     // Increment likes for the existing content
//     const updatedContent = await incrementLikes(content);
//     console.log('Updated Content:', updatedContent);

//     res.status(200).json({ message: 'Content liked successfully' });
//   } catch (error) {
//     console.error('Error liking content:', error);
//     res.status(500).json({ error: 'Failed to like content' });
//   }
// });



router.get('/media', authenticate, (req, res) => {
  getAllMedia()
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});


router.post('/media', authenticate, (req, res) => {
  createMedia(req.body)
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.put('/media/:id', authenticate, (req, res) => {
  updateMedia(req.params.id, req.body)
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.delete('/media/:id', authenticate, (req, res) => {
  deleteMedia(req.params.id)
    .then(() => {
      res.status(200).send('Media deleted successfully');
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

// Category routes
router.get('/categories', authenticate, (req, res) => {
  getAllCategories()
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.post('/categories', authenticate, (req, res) => {
  createCategory(req.body)
    .then((data: any) => {
      res.status(201).send(data);
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.put('/categories/:id', authenticate, (req, res) => {
  updateCategory(req.params.id, req.body)
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.delete('/categories/:id', authenticate, (req, res) => {
  deleteCategory(req.params.id)
    .then(() => {
      res.status(200).send('Category deleted successfully');
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});
export default router;
