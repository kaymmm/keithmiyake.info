---
layout: single
title: 'Learn Bootstrap Part 1: Getting Acquainted with Bootstrap'
date: 2013-11-03 16:02:08.000000000 -08:00
type: post
published: true
status: publish
categories:
- Digital Humanities
tags:
- bootstrap
- wordpress
meta:
  _edit_last: '1'
  _wpas_done_all: '1'
  _thumbnail_id: '183'
  slide_template: default
author:
  login: kmiyake
  email: keith.miyake@gmail.com
  display_name: Keith Miyake
  first_name: Keith
  last_name: Miyake
gallery:
  - url: /assets/img/Bootply_-_The_Bootstrap_Playground-300x145.png
    image_path: /assets/img/Bootply_-_The_Bootstrap_Playground-300x145.png
    alt: Links styled with Bootstrap
    title: Links styled with Bootstrap
  - url: /assets/img/test.html_.png
    image_path: /assets/img/test.html_.png
    alt: Links without Bootstrap
    title: Links without Bootstrap styles
featured:
  src: /assets/img/Bootply_-_The_Bootstrap_Playground-300x145.png
  alt: Menu navigation styled with Bootstrap
---
This is the first in a series of posts that will serve as a mini-course in using the [Bootstrap](http://getbootstrap.com/){:target="_blank"} web framework to eventually build a custom WordPress theme.

# What is Bootstrap?

Bootstrap is an open-source project to create flexible design and layout components for the web. It is basically a bunch of predefined styles that anyone can slap onto their website to make things look neat and uniform. By including the CSS and Javascript for Bootstrap on a web page, a bunch of components are made available such as buttons, lists, boxes, and menus. Most of these components only require a basic knowledge of HTML to incorporate into a page.

#### Example:

This is what the exact same code snippet looks like in a browser with and without the inclusion of Bootstrap's styles.

{% include gallery caption="This is the same code, unstyled on the left, styled with Bootstrap on the right" %}

Here's the HTML for this example: 

```html
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-bookmark"></span> Quick Shortcuts</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-6 col-md-6">
                          <a href="#" class="btn btn-danger btn-lg" role="button"><span class="glyphicon glyphicon-list-alt"></span> <br />Apps</a>
                          <a href="#" class="btn btn-warning btn-lg" role="button"><span class="glyphicon glyphicon-bookmark"></span> <br />Bookmarks</a>
                          <a href="#" class="btn btn-primary btn-lg" role="button"><span class="glyphicon glyphicon-signal"></span> <br />Reports</a>
                          <a href="#" class="btn btn-primary btn-lg" role="button"><span class="glyphicon glyphicon-comment"></span> <br />Comments</a>
                        </div>
                        <div class="col-xs-6 col-md-6">
                          <a href="#" class="btn btn-success btn-lg" role="button"><span class="glyphicon glyphicon-user"></span> <br />Users</a>
                          <a href="#" class="btn btn-info btn-lg" role="button"><span class="glyphicon glyphicon-file"></span> <br />Notes</a>
                          <a href="#" class="btn btn-primary btn-lg" role="button"><span class="glyphicon glyphicon-picture"></span> <br />Photos</a>
                          <a href="#" class="btn btn-primary btn-lg" role="button"><span class="glyphicon glyphicon-tag"></span> <br />Tags</a>
                        </div>
                    </div>
                    <a href="http://www.jquery2dotnet.com/" class="btn btn-success btn-lg btn-block" role="button"><span class="glyphicon glyphicon-globe"></span> Website</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

As you can see, there is a pretty dramatic difference between the list of links without styling and the Bootstrap themed links. The magic of Bootstrap rests in its use of CSS styling to modify the placement and appearance of web elements with minimal additional HTML coding.

This first lesson will introduce some of the basics of Bootstrap. It starts with browsing through some websites that use Bootstrap to give a sense of what Bootstrap components look like. Then it moves on to cut-and-paste coding to begin laying out a static page using Bootstrap components, with the goal of getting something that vaguely resembles someone else's Bootstrap page layout.

## Step 1: Check out Bootstrap in Action

A good way to learn how to use a new tool like Bootstrap is by seeing it in action and then trying to imitate what you see.

Since this course is designed to not do anything for you, but rather to guide you through the learning process, I'm only providing a few links to pages containing galleries of sites that employ Bootstrap. Check out the galleries and find a few examples that you find most attractive.

Try to focus on layout, colors, typography, and to a lesser degree, site structure. Don't worry about things like graphics or content since those are things you will plug in once you are finished. You probably won't find a site that contains all of the design elements in a single place, so pick a few sites, each with aspects that you find appealing.

 * <a href="http://www.pinterest.com/search/?q=Bootstrap" target="_blank">Pintrest posts tagged #Bootstrap</a>
 * <a href="http://expo.getbootstrap.com/" target="_blank">The official bootstrap “expo”</a>
 * <a href="http://lovebootstrap.com" target="_blank">LoveBootstrap</a>

## Step 2: Find Some Bootstrap Templates

Once you have some sense of the design elements you want to include in your end product, the next step is to look for a base template that might serve as a good starting point.

Head over to <a href="http://startbootstrap.com/all-templates" target="_blank">StartBootstrap</a> and see if you can find any templates that have a similar overall layout to what you found appealing in the first step. Download the template to your computer and unzip it. There should be one or more HTML files in the base folder, depending on which template you downloaded, and a couple of additional folders containing CSS and javascript (.js) files, as well as any img the template requires, such as images. Try loading the various HTML files in a browser. The page should just work. If things don't look right, and you tried loading the page in a couple of different browsers, don't worry about it, and just continue to the next step, but keep those HTML and CSS files handy because you'll use them again in the next couple steps.

## Step 3: Play with Bootstrap!

Now that you have a base template, it's time to get our feet wet with some HTML coding. Don't worry too much if you don't really understand HTML, we're not going to be doing any major editing yet. For now we're just going to use copy-paste-coding, meaning that all you need to do is to copy-paste code snippets from one place to another. But a getting a basic understanding of the structure of an HTML document might be useful if everything just looks Greek to you.

The goal of this step is to start putting together Bootstrap components to make your template look more like the demo pages you found in the first step. This means taking the different templates you found, cutting-and-pasting chunks of code, and modifying your base template until it is a fairly decent representation of the demo site you found.*

> *Note:* the demo site you found might have used a bunch of trickery to do cool things like making tumblr-esque blocks fit together like a mosaic, or to animate things, or make wallpapers do funky scrolling things. Don't worry about those things for now. Just try to get the components to look roughly similar. The trickery will have to wait until later...

You have three options here, and I suggest trying all three to see which works best for you, but eventually you'll end up using the first option so might as well get comfortable with it sooner than later. The first option is to use a text or HTML editor and edit the raw HTML from your template files and preview your changes in a browser. The second is to use a web-based tool to "playground" your code snippets and view them in almost real-time. The third is to use a web-based graphical interface for laying out Bootstrap components.

For the first option, I recommend using a text editor such as TextMate (OS X), Sublime Text (OS X and Windows), Notepad++ (Windows), or whatever happens to be your personal preference if you're on Linux (since if you're using it I assume you already have an allegiance to either vim or emacs...esc:q!). When you make changes, save the file and reload your browser. Simple as that. When things don't look quite right or as you had hoped, right click on in your browser on the thing that doesn't look quite right, and clink on "inspect element" or whatever is your browser's equivalent (try Google if you're not sure). Check out the code snippet for that component and make sure that it's in the right place relative to other the other components on the page (the components should be highlighted on the page as you scroll over the code chunks). This debugging tool is going to be your friend over the next several lessons, so get comfortable using it.

For the second option, go to <a href="http://bootply.com" target="_blank">The Bootstrap Playground</a>. It's a site that allows you to test out Bootstrap code in your browser and see view the results in almost real-time. Start a new "playground" and try loading some of the templates and community-contributed code snippets. See if you can figure out what the code snippets do. Try loading the html from the template you downloaded in the previous step. Can you get it to load properly? You might need to include some additional CSS or javascript to get things to look and function correctly. Bootply is still a little rough around the edges, so it's not a big deal if things don't work out or you are totally confused by it.

The third option is to use a visual layout editor. I recommend checking out <a href="https://divshot.com/blog/product-updates/divshot-1-0-visual-front-end-development-for-bootstrap/" target="_blank">Divshot</a>. They have a free plan (still requires registering) that should be plenty for this mini-course. Try it out and definitely check out their very thorough tutorial. <a href="https://www.easel.io/demo" target="_blank">Easel.io</a> is also very slick and works well, and like divshot, they have a free plan, but theirs only lets you save up to 3 pages.

You might also check out <a href="http://www.pingendo.com/" target="_blank">Pingendo</a>, which is a free visual editor that runs on Windows or OS X, but is still very rough around the edges and isn't very drag-and-drop friendly. There is also <a href="http://www.layoutit.com/" target="_blank">LayoutIt</a> which seems like it works decently, but I haven't spent enough time playing with it to know how well it works compared to divshot or easel.io.

## Next steps...

If you've made it this far, you're well on your way to using Bootstrap. You should now have one or more HTML pages (along with CSS and some javascript) that lets you display something roughly resembling the demo page you found in the first step, or at least that contains features of that demo page. Keep a list of those things that you weren't able to reproduce because we'll try to figure out how to make them work in upcoming lessons.

For now, save your work and take a well deserved break.

If you got stuck along the way, remember, Google is your friend when you're learning something new. See if you can google your way to the next step, or post a comment here and hopefully I (or some other kind soul) will be able to help you.
