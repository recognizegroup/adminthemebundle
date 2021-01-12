<?php
namespace Recognize\AdminThemeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;

class SwitchType extends AbstractType {

    public function getParent(){
        return CheckboxType::class;
    }

    public function getName(){
        return "switch";
    }

}