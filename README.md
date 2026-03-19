# Trello Clone – Task Management Application


This project is a full-stack task management application inspired by Kanban-style workflow systems. Built using Next.js, Supabase, and Clerk, it provides a scalable and secure platform for managing tasks, organizing workflows, and collaborating efficiently. The application enables users to visually structure their work through boards, lists, and cards, improving clarity and productivity.


## Purpose

The primary purpose of this project is to design and implement a modern, responsive task management system that simplifies how individuals and teams organize their work. It demonstrates the integration of authentication, real-time database operations, and dynamic UI rendering using contemporary web technologies.


## Real-World Problem

In both academic and professional environments, managing multiple tasks across different projects can become disorganized and inefficient. Common challenges include:

* Lack of centralized task tracking, Difficulty in prioritizing work
* Poor visibility into task progress, Inefficient collaboration among team members
* Over-reliance on scattered tools such as notes, spreadsheets, or messaging platforms

These issues often lead to missed deadlines, reduced productivity, and confusion in workflow management.


## Proposed Solution

This application addresses these challenges by providing a centralized, intuitive platform where users can:

* Create and manage multiple project boards, Organize tasks into structured lists
* Track progress visually using a drag-and-drop interface, Maintain clear ownership and accountability of tasks
* Access their data securely through authentication

By consolidating task management into a single system, the application enhances organization, transparency, and efficiency.

### Authentication and User Management

* Secure user authentication powered by Clerk, Session management and protected routes, User-specific data access

### Board and Task Management

* Create, update, and delete boards, Organize tasks into lists within each board
* Add, edit, and remove cards (tasks), Store and retrieve data using Supabase

### Real-Time Data Handling

* Seamless synchronization of task data, Efficient querying and updates via Supabase APIs

### Responsive User Interface

* Built with Next.js for fast rendering and routing, Clean and intuitive layout for better user experience, Optimized for both desktop and mobile devices

### Data Security

* Row Level Security (RLS) policies in Supabase, Controlled access to user-specific data


## Application Workflow

1. User signs up or logs in via Clerk authentication. A personalized dashboard is presented.
2. Users create boards to represent projects or workflows. Each board contains lists that categorize tasks.
3. Tasks (cards) can be created, updated, and organized within lists. All data is securely stored and retrieved from Supabase.


## Use Cases

* Academic project planning, Personal task management
* Team collaboration and workflow tracking, Agile development task boards
* Startup or small team productivity tools


<b>Environment Variables Example</b>
```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aWRlYWwtZGlub3NhdXItNi5jbGVray6hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_2lNphdfGqHWvdWTXKct5NeQU3RCkx8ruei4qgZE8z8

# supabase 
NEXT_PUBLIC_SUPABASE_URL=https://utzofsvmgeldwefpkxfht.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_aU4y48vS7yKgabIYzU3I4Q_LHx_y2Fc

```


## Project Overview
<div align="center">
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
    <div style="flex: 1 1 45%; min-width: 300px;">
      <img width="100%" src="https://github.com/MirrorMorphy/Trello/blob/main/asset/land.png" />
    </div>
    <div style="flex: 1 1 45%; min-width: 300px;">
      <img src="https://github.com/MirrorMorphy/Trello/blob/main/asset/home.png" width="100%" />
    </div>
    <div style="flex: 1 1 45%; min-width: 300px;">
      <img src="https://github.com/MirrorMorphy/Trello/blob/main/asset/board.png" width="100%" />
    </div>
    <div style="flex: 1 1 45%; min-width: 300px;">
      <img src="https://github.com/MirrorMorphy/Trello/blob/main/asset/create.png" width="100%" />
    </div>
    <div style="flex: 1 1 45%; min-width: 300px;">
      <img src="https://github.com/MirrorMorphy/Trello/blob/main/asset/kanban.png" width="100%" />
    </div>
  </div>
</div>
