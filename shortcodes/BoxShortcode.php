<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class BoxShortcode extends Shortcode
{
    public function init()
    {

        $this->shortcode
            ->getHandlers()
            ->add('box', function (ShortcodeInterface $sc) {

                $output = $this->twig->processTemplate(
                    'partials/box.html.twig',
                    [
                        'title_classes' => $sc->getParameter('title_classes'),
                        'content_classes' => $sc->getParameter('content_classes'),
                        'title' => $sc->getParameter('title'),
                        'content' => $sc->getContent(),
                    ]
                );

                return $output;
            });
    }
}