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
use App\Answer;
use Pusher;
use function GuzzleHttp\json_decode;
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
        Answer::where('qID',$r->input('id'))->delete();
        return response()->json([
            'message' => 'The question was deleted!'
        ], 200);
    }   
    function getQuestions(){
        return json_decode(Quiz::get());
    }
    function submitQuiz(Request $r){
        $data = $r->input('data');
        if(sizeof($data)>0)
        {
            $reports = [];
            $ids = [];
            foreach ($data as $key => $value) {
                $split = explode('-',$value);
                if(!($split[0]==='ans1' || $split[0]==='ans2' || $split[0]==='ans3'))
                {
                    return response()->json([
                        'message' => $split[0]
                    ], 200);
                }
                if(!Quiz::where('id',$split[1])->exists()){
                    return response()->json([
                        'message' => 'Something is wrong!'
                    ], 200);
                }
                $count=0;
                array_push($ids,$split[1]);
                if(Answer::where('qID',$split[1])->where('answer',$split[0])->exists())
                {
                    $count=Answer::where('qID',$split[1])->where('answer',$split[0])->select('count')->first()->count;
                    
                }
                 Answer::updateOrCreate(
                    ['qID' => $split[1], 'answer' => $split[0]],
                    ['count' => ($count+1)]
                );
            } 
            foreach ($ids as $key => $value) {
               $tmpquiz = json_decode((Quiz::select('question')->where('id',$value)->first())->question,true);
                $reports[$key]['quiz']=$tmpquiz;
                $tmpans1=(Answer::where('qID',$value)->where('answer','ans1')->select('count')->first());
                if($tmpans1!=null)
                {$reports[$key]["ans1"]=$tmpans1->count;}
                else
                {$reports[$key]["ans1"]=0;}


                $tmpans2=(Answer::where('qID',$value)->where('answer','ans2')->select('count')->first());
                if($tmpans2!=null)
                {$reports[$key]["ans2"]=$tmpans2->count;}
                else
                {$reports[$key]["ans2"]=0;}
                
                $tmpans3=(Answer::where('qID',$value)->where('answer','ans3')->select('count')->first());
                if($tmpans3!=null)
                {$reports[$key]["ans3"]=$tmpans3->count;}
                else
                {$reports[$key]["ans3"]=0;}
                
                $reports[$key]["votes"]=((int)Answer::where('qID',$value)->sum('count'));
           
            }
         
            $this->Pushers(json_encode($reports),"Reports","Update");
            return response()->json([
                'message' => "Success",
                'data' => $reports
            ], 200);
        }        
    }
    private function Pushers($data,$channel,$event)
    {
        $options = array(
            'cluster' => 'eu',
            'encrypted' => true
          );
          $pusher = new Pusher\Pusher(
            '2948bde252ef68ca5557',
            '9ac3ce6776325c7db743',
            '739802',
            $options
          );
          $pusher->trigger($channel, $event, $data);
    }
}