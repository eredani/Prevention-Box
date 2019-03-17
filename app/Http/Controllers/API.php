<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Validator;
use Illuminate\Support\Facades\Response;
use function GuzzleHttp\json_encode;
use App\Quiz;
class API extends Controller
{
    function addQuestion(Request $r){
        Validator::make($r->all(), [
            'question' => 'required|string|max:255',
            'ans1' => 'required|string|max:100',
            'ans2' => 'required|string|max:100',
            'ans3' => 'required|string|max:100',
        ])->validate();
        $value = json_encode($r->all());
        $quiz  = new Quiz;
        $quiz->question = $value;
        $quiz->save();
        return response()->json([
            'message' => 'The question was added!'
        ], 200);
    }
    function editQuestion(Request $r){
        Validator::make($r->all(), [
            'question' => 'required|string|max:255',
            'ans1' => 'required|string|max:100',
            'ans2' => 'required|string|max:100',
            'ans3' => 'required|string|max:100',
            'id' => 'required|integer|exists:quizs,id'
        ])->validate();
        $value = json_encode($r->except(['id']));
        $quiz  = Quiz::find($r->input('id'));
        $quiz->question = $value;
        $quiz->save();
        return response()->json([
            'message' => 'The question was changed!'
        ], 200);
    }
    function delQuestion(Request $r){
        Validator::make($r->all(), [
            'id' => 'required|integer|exists:quizs,id',
        ])->validate();
        Quiz::find($r->input('id'))->delete();
        return response()->json([
            'message' => 'The question was deleted!'
        ], 200);
    }   
    function getQuestions(){
        return json_decode(Quiz::get());
    }
}