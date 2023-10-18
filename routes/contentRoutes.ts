import express from 'express';
import {
  createCategory,
  createContent,
  createMedia,
  createPermission, createRole, createUser,
  deleteCategory,
  deleteMedia,
  getAllCategories,
  getAllContent,
  getAllMedia,
  getAllPermission, getAllRoles, getAllUsers, login,
  updateCategory,
  updateMedia
} from '../controllers/user.js';
import { loginValidationRules, signupValidationRules, validate } from '../middleware/validation.js';

import { authenticate } from '../middleware/authMiddleware.js';
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


router.get('/', authenticate, (req, res, next) => {
  getAllUsers().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    res.status(404).send(error)
  })
});

/* POST permission. --------------------------------------------------------------------------------------------------*/


router.post('/permission', (req, res, next) => {
  try {
    createPermission(req.body)
    res.status(201).send("permission created successfully")
  } catch (error) {
    res.status(500).send("something went wrong")
  }
});



router.get('/permission', authenticate, function (req, res, next) {
  getAllPermission().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});



router.post('/role', (req, res, next) => {
  createRole(req.body).then(data => {
    res.status(201).send(data)
  }).catch(error => {
    res.status(500).send("something went wrong")
  })
});




router.get('/roles', authenticate, function (req, res, next) {
  getAllRoles().then(data => {
    res.status(200).send(data)
  }).catch(error => {
    console.log(error);
    res.status(500).send("something went wrong")
  })
});
router.get('/content', authenticate, (req, res) => {
  getAllContent()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

router.post('/content', authenticate, (req, res) => {
  createContent(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

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
