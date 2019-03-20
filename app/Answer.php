<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = [
        'qID', 'count', 'answer',
    ];
    const CREATED_AT = null;
    const UPDATED_AT = null;
}
