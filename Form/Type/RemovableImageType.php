<?php
namespace Recognize\AdminThemeBundle\Form\Type;

use Doctrine\Common\Util\Debug;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\PropertyAccess\PropertyAccess;

class RemovableImageType extends AbstractType {
    /**
     * @var mixed
     */
    protected $entity;

    /**
     * @var string
     */
    protected $remove_upload_function;

    /**
     * @var string
     */
    protected $image_path_property;

    /**
     * @var null|\Symfony\Component\HttpFoundation\Request
     */
    protected $request;

    /**
     * @var string
     */
    protected $name;

    public function __construct(RequestStack $requestStack)
    {
        $this->request = $requestStack->getCurrentRequest();
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->remove_upload_function = $options['remove_upload_function'];
        $this->image_path_property = $options['image_path_property'];
        $this->name = $builder->getForm()->getConfig()->getName();

        if($this->image_path_property == null) {
            $this->image_path_property = $this->name.'Path';
        }

        $builder->addEventListener(FormEvents::POST_SET_DATA, function ($event) {
            $this->entity = $event->getForm()->getParent()->getData();

            if($this->entity != null) {
                $data = $this->request->request->get($this->name.'_remove_upload');

                if ($data == 'true') {
                    $function = $this->remove_upload_function;
                    $this->entity->$function();

                    $accessor = PropertyAccess::createPropertyAccessor();
                    $accessor->setValue($this->entity, $this->image_path_property, null);
                }
            }
        });
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        parent::buildView($view, $form, $options);

        $name = $view->vars['name'];

        if($options['image_web_path_property'] == null) {
            $options['image_web_path_property'] = $name.'WebPath';
        }

        $options['image_web_path_property'] = lcfirst($options['image_web_path_property']);

        $this->entity = $view->parent->vars['value'];

        $path = '';

        if($this->entity != null) {
            $accessor = PropertyAccess::createPropertyAccessor();
            $path = '/'.$accessor->getValue($this->entity, $options['image_web_path_property']);
        }

        $view->vars['attr']['data-path'] = $path;
        $view->vars['attr']['class'] = 'removable-image-upload';
    }

    public function getParent(){
        return FileType::class;
    }

    public function getName(){
        return 'removable_image';
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'image_web_path_property' => null, /* if set to null, it will automatically use the field's name and add WebPath to it */
            'image_path_property' => null, /* if set to null, it will automatically use the field's name and add Path to it. */
            'remove_upload_function' => 'removeUpload' /* if not defined, it will automatically use removeUpload */
        ));
    }

}