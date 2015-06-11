RecognizeAdminThemeBundle
========================

This bundle gives you an admintheme based on the Bootstrap 3 framework. It uses sass to generate the theme file.
It is tested on IE9 and above, Firefox,Chrome as well as Chrome for Android. It is responsive and 
is usable with just a keyboard.

Features include:
* Slideout navigation
* Switch form widget
* Checkbox and radio styling
* Button submit loading animation
* Multilanguage support and integration
* Styled login page

Installation
-----------

Add the bundle to your composer.json

```json
# composer.json
{
	"repositories": [
		{
			"type": "git",
			"url":  "git@bitbucket.org:recognize/adminthemebundle.git"
		}
	],
	 "require": {
		"recognize/adminthemebundle": "dev-master",
	}
}
```

Run composer install

```sh
php ./composer.phar install
```

Enable the bundle in the kernel

```php
	<?php
	// app/AppKernel.php

    public function registerBundles()
    {
        $bundles = array(
            // ...
            new Recognize\AdminThemBundle\RecognizeAdminThemBundle(),
        );
    }
```

Add the bundles form widgets to your twig configuration

```yml
// app/config

twig:
	form:
		resources:
           - 'RecognizeAdminThemeBundle::form_widgets.html.twig'
```

Add the dependencies of the package.json file to your own package.json and run npm install

```sh
npm install
```

Make sure you have Ruby and the SASS gem installed

```sh
gem install sass
```

Also add the following line of code to your GulpFile.js to add the default theme tasks

```sh
// GulpFile.js
require("./vendor/recognize/admintheme-bundle/Recognize/AdminThemeBundle/tasks.js")( gulp );
```

To build the default admintheme, run the following command:

```sh
gulp default-theme
```

This will build the sass files and combine the javascript files, before loading the required resources into the web/admintheme folder.


Configuration
--------------

Add this to your app/config.yml file

```yml
// app/config.yml
recognize_admin_theme:
	languages: [] // Array containing locale strings of the languages that are supported in the interface
	leftmenu: 'RecognizeCMS:Builder:dashboard' // KNP menu builder method that generates the main navigation menu - example RecognizeCMSBundle:Builder:leftmenu
```

Keeping the languages array empty will result in the languages not being switchable in the Profile dropdown.
If you need to know more about KNPMenuBundle, refer to [the official documentation][1]

[1]: http://symfony.com/doc/master/bundles/KnpMenuBundle/index.html


Usage
--------------

Simply extend the bundles index.html.twig file in your own twig files to get the basic template.

Enabling check- and radiobutton styling in the forms
----------------

Use the following form theme to add the themed checkboxes

```twig
{% form_theme 'RecognizeAdminThemeBundle::Form/bootstrap_3_layout_fa_checkboxes.html.twig' %}
```

Theming
--------------

This bundle uses SASS to generate the themes. You can reference the bundle's sass files in your own sass files
to generate your own theme.css. Make sure the required files are piped to the Symfony2 web/admintheme folder.

If you want to override the bundles layout, you can add your own twig files to the 
app/Resources/RecognizeAdminThemeBundle/views directory. 
Putting an index.html.twig file here will override this bundle's index.html.twig file. 
Putting a components/menu.html.twig here will override this bundle's components/menu.html.twig file and so on.