<?php
namespace Grav\Theme;

use Grav\Common\Grav;
use Grav\Common\Theme;

class Ccl extends Theme {
    private $assetsDir = 'theme://';

    public static function getSubscribedEvents() {
        return [
            'onTwigSiteVariables' => ['onTwigSiteVariables', 0],
        ];
    }

    public function onTwigSiteVariables($event) {
        $this->registerAssets();
    }

    private function registerAssets() {
        $assets = $this->getJsonData($this->assetsDir . 'assets.json');

        foreach ($assets as $name => $paths) {
            if ($name == '') {
                continue;
            }

            $files = [];

            foreach ($paths as $extension => $path) {
                $files[] = $this->assetsDir . $path;
            }

            $this->grav['assets']->registerCollection($name, $files);
        }
    }

    private function getJsonData($location) {
        $path = $this->grav['locator']->findResource($location);

        if ($path) {
            return json_decode(file_get_contents($path), true);
        }

        return [];
    }

    public static function getFlexData($fields) {
        $grav = Grav::instance();
        $flex_entries = $grav['flex-entries'];
        $data = $flex_entries->getData()->toArray();
        $options = [];

        foreach ($data as $key => $item) {
            $values = [];

            foreach ($fields as $field) {
                if ($item[$field]) {
                    $values[] = $item[$field];
                }
            }

            $options[$key] = implode(' ', $values);
        }

        asort($options);
        $options += ['' => ''];

        return $options;
    }
}
