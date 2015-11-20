<?php

namespace Bendani\PhpCommon\FilterService\Model;

class FilterManager
{

    /** @var array  */
    private $filters;
    private $filtersAsList;

    public function __construct($filters)
    {
        $this->filtersAsList = $filters;
        foreach($filters as $filter){
            $this->filters[$filter->getFilterId()] = $filter;
        }
    }

    public function handle($filterId, $queryBuilder, $value, $operator){
        /** @var FilterHandler $handler */
        $handler = $this->filters[$filterId];
        $queryBuilder = $handler->joinQuery($queryBuilder);

        if($handler->getType() === "multiselect"){
            $value = array_map(function($item){
                return $item["value"];
            }, $value);
        }
        return $handler->handleFilter($queryBuilder, $value, $operator);
    }

    public function getFilters()
    {
        return $this->filters;
    }

    public function getFiltersInJson(){
        $jsonItems = array_map(function ($item) {
            return array(
                "id" => $item->getFilterId(),
                "group" => $item->getGroup(),
                "type" => $item->getType(),
                "field" => $item->getField(),
                "options" => method_exists($item, "getOptions") ? $item->getOptions() : null,
                "supportedOperators" => $item->getSupportedOperators()
            );
        }, $this->filtersAsList );
        return $jsonItems;
    }
}