// js/posts.js

import { supabase } from './supabase.js';
import { displayMessage } from './ui.js';

// check user and toggle UI
const {
  data: { user },
} = await supabase.auth.getUser();

// elements
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const logoutBtn = document.querySelector('#js-logout-btn');
const postForm = document.querySelector('.create-post-form');

// toggle UI based on login/logout
if (user) {
  // logged in
  if (loginLink) loginLink.style.display = 'none';
  if (registerLink) registerLink.style.display = 'none';
} else {
  // logged out
  if (logoutBtn) logoutBtn.style.display = 'none';
  if (postForm) postForm.style.display = 'none';
}

// logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.href = 'login.html';
  });
}

// create post form
if (postForm) {
  postForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    const category = form.category.value.trim();
    const fieldset = form.querySelector('fieldset') || form;

    try {
      fieldset.disabled = true;

      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            category,
            submitted_by: user.email,
            user_id: user.id,
          },
        ]);

      if (error) {
        displayMessage('#js-message-container', 'error', error.message);
        return;
      }

      displayMessage(
        '#js-message-container',
        'success',
        'Post created successfully',
      );

      form.reset();
      loadPosts(); // refresh list
    } catch (error) {
      console.log(error);
      displayMessage('#js-message-container', 'error', error.toString());
    } finally {
      fieldset.disabled = false;
    }
  });
}

// load posts
loadPosts();

async function loadPosts() {
  const postsContainer = document.querySelector('#posts-list');
  postsContainer.innerHTML = '';

  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      displayMessage('#js-message-container', 'error', error.message);
      return;
    }

    if (!posts || posts.length === 0) {
      displayMessage(
        '#js-message-container',
        'info',
        'No posts have been made.',
      );
      return;
    }

    // loop through each post
    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    displayMessage(
      '#js-message-container',
      'error',
      'Failed to load posts. Refresh the page.',
    );
  }
}

// post elements and posts that have been created
function createPostElement(post) {
  const wrapper = document.createElement('div');
  wrapper.className = 'post';

  const title = document.createElement('h3');
  title.className = 'post-title';
  title.textContent = post.title;

  const content = document.createElement('p');
  content.className = 'post-content';
  content.textContent = post.content;

  const category = document.createElement('p');
  category.className = 'post-category';
  category.textContent = `Category: ${post.category || 'None'}`;

  const submittedBy = document.createElement('p');
  submittedBy.className = 'post-submittedBy';
  submittedBy.textContent = `By: ${post.submitted_by || 'Unknown'}`;

  const createdAt = document.createElement('p');
  createdAt.className = 'post-createdAt';

  const date = new Date(post.created_at);
  createdAt.textContent = `Created: ${date.toLocaleString()}`;

  wrapper.appendChild(title);
  wrapper.appendChild(content);
  wrapper.appendChild(category);
  wrapper.appendChild(submittedBy);
  wrapper.appendChild(createdAt);

  return wrapper;
}
