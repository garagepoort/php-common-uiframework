<?php

namespace Bendani\PhpCommon\FilterService\Model;

use Bendani\PhpCommon\Utils\Model\BasicEnum;

class FilterOperator extends BasicEnum{
    const EQUALS = "equals";
    const GREATER_THAN = "greater_than";
    const LESS_THAN = "less_than";
    const CONTAINS = "contains";
    const IN = "in";
    const ENDS_WITH = "ends_with";
    const BEGINS_WITH = "begins_with";

    public static function getDatabaseOperator($operator){
        if($operator == FilterOperator::EQUALS){
            return "=";
        }
        if($operator == FilterOperator::GREATER_THAN){
            return ">";
        }
        if($operator == FilterOperator::LESS_THAN){
            return "<";
        }
    }
}