<?php

namespace Bendani\PhpCommon\UiFramework\Providers;

use Illuminate\Support\ServiceProvider;

class UiFrameworkProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([__DIR__.'/../../public' => public_path('packages/bendani/php-common/uiframework'),], 'public');
    }


}