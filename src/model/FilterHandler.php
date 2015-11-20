<?php

namespace Bendani\PhpCommon\FilterService\Model;

interface FilterHandler
{

    public function handleFilter($queryBuilder, $value, $operator);

    public function getFilterId();

    public function getGroup();

    public function getType();

    public function getField();

    public function getSupportedOperators();

    public function joinQuery($queryBuilder);
}