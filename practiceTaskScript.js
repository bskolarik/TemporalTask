//FOR PRACTICE TASK.  EASILY DISCRIMINABLE INTERVALS RUN AS MANY TIMES AS NEEDED TO REACH CRITERION

//task variables here.
import UnityEngine.UI;
var style : GUIStyle;
//All the sprites used for target objects
var target10:GameObject; 
var target11:GameObject;
var target12:GameObject;
var tmpObject:GameObject;//this is the shell to change which object is presented on each trial variably in a loop
var tmpString:String;

//Arrays of objects and intervals used
var objectList = new Array("target10","target11","target12");

var orderArray_1 = new Array(0,1,2);
var orderArray_2 = new Array(1,2,0);
var orderArray_3 = new Array(2,0,1);
var orderArray_4 = new Array(0,2,1);

var allOrderArray = new Array(orderArray_1,orderArray_2,orderArray_3,orderArray_4);//array used for training
var allOrderArray_2 = new Array(orderArray_2,orderArray_3,orderArray_4,orderArray_1);//array used for test trials

//lists of intervals for 3 blocks
var intervalArray =   new Array(5,30,60);// array of all possible temporal intervals in seconds

//variables for block 1
var testObjects_1 = new Array("target10","target11");
var testObjects_2 = new Array("target10","target12");
var testObjects_3 = new Array("target11","target10");
var testObjects_4 = new Array("target12","target10");
var testObjects_5 = new Array("target11","target12");
var testObjects_6 = new Array("target12","target11");

var block1TestObjects = new Array(testObjects_3,testObjects_4,testObjects_1);
var block2TestObjects = new Array(testObjects_2,testObjects_2,testObjects_6);
var block3TestObjects = new Array(testObjects_1,testObjects_6,testObjects_3);
var block4TestObjects = new Array(testObjects_4,testObjects_5,testObjects_5);

var allTestBlocks = new Array(block1TestObjects,block2TestObjects,block3TestObjects,block4TestObjects);


//this will change as well
var ITI:int = 2; // time (seconds) that object is on the screen during training trials.
public var responseVar:String;
public var nextTrial:boolean = false;
public var hold:boolean = false;
public var tmpVar:int;
public var i:int;
public var j:int;
public var tmpInterval:int;

var PlanetEarth_PracticeBlock:MovieTexture;//creates the movie texture, this will have to be changed to _1,_2 etc for each of the different movies

var movieImage:UI.RawImage;//creates the raw image object for the movie to be attached
			
function Start(){
//after instructions initiate the movie texture.  This should play the entire time unless instructions
//are on the screen
    movieImage.enabled = false;//turns off the movie image for the startup screen
    movieImage.texture=PlanetEarth_PracticeBlock;//sets the movie texture to the raw image object
	var aud: AudioSource = GetComponent.<AudioSource>();
	aud.clip = PlanetEarth_PracticeBlock.audioClip;

	GameObject.Find("EndText").GetComponent(MeshRenderer).enabled = false;
	GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;
	GameObject.Find("EncodingInstructions").GetComponent(TextMesh).text = "For this task you will be watching a film.\nPeriodically the film will be inerupted and an\nobject presented. Try to keep track of how\nmuch time has passed since the last object\n presentation. Do not count the intervals and\nbe sure to pay attention to the details\npresented in the film";//change this to the encoding instructions
    System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt","Block" + "," + "Trial" + "," + "interval" + "," + "Choice 1" + "," + "Choice 2" + "," + "ResponseKey" + '\n');
	GameObject.Find("target1").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target2").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target3").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target4").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target5").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target6").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target7").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target8").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target9").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target10").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target11").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target12").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number3").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number4").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number5").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number6").GetComponent(SpriteRenderer).enabled = false;
	while (!Input.GetKeyDown(KeyCode.Alpha9)) yield;//instruction remain on screen and task will not start until 9 is pressed

	if(Input.GetKeyDown(KeyCode.Alpha9)){
 		GameObject.Find("EncodingInstructions").GetComponent(MeshRenderer).enabled = false;//turns the task instructions off and begins the task
 	}

	for(block = 0; block < 4; block++){//loops over 3 blocks of 3 trials each
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("BreakText").GetComponent(TextMesh).text = "Start";//change this to the encoding instructions
		yield WaitForSeconds(2);
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

		for(i  = 0; i < 3; i++){ //determines the object to be presented
		  	aud.Play();
			PlanetEarth_PracticeBlock.Play();//sets the movie playing

		    movieImage.enabled = true;//turns on the movie at the beginning of the interval
   			tmpInterval= intervalArray[allOrderArray[block][i]];//gets the interval to wait on that trial
   			tmpString = objectList[allOrderArray[block][i]];//gets the string of the object name to be presented
   			tmpObject=GameObject.Find(tmpString);//finds the game object
   			tmpObject.transform.position = Vector3(0,0,0);//moves the game object to center
   			yield WaitForSeconds(tmpInterval);//waits for the selected temporal inteval before presenting the object
   			aud.Pause();
			PlanetEarth_PracticeBlock.Pause();//sets the movie playing

   			movieImage.enabled = false;//turns off the movie while the object is rendered
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = true;
   			yield WaitForSeconds(ITI);
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = false;
		}

		//break after each set of 3 intervals
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Break. \n Press Return to Continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

 	}//closes block loop

 	    //present recall instructions
		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("RecallInstructions").GetComponent(TextMesh).text = "You will now start the retrieval portion\n of the task. You will see 2 items on\n the screen after an interval of time.\nPlease choose the number of the\nitem that was associated with that\ninterval and press space bar\nto lock in your answer.\nPress 8 to continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Alpha8)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;

     for(block = 0; block < 4; block++){//loops over 4 blocks of 3 trials each
		for(var j :int = 0; j < 3; j++){
			nextTrial = false;
   			tmpInterval = intervalArray[allOrderArray_2[block][j]];//change this to a new pseudo random order
   			yield WaitForSeconds(tmpInterval);

   			//need to grab 2 objects to present on each trial
   			GameObject.Find(allTestBlocks[block][j][0]).transform.position = Vector3(-3,0,0);//transforms the game objects to correct position
   			GameObject.Find(allTestBlocks[block][j][1]).transform.position = Vector3(3,0,0);

   			GameObject.Find(allTestBlocks[block][j][0]).GetComponent(SpriteRenderer).enabled = true;//turns on test object renderer
	    	GameObject.Find(allTestBlocks[block][j][1]).GetComponent(SpriteRenderer).enabled = true;
			
			GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = true;//turns on number choice renderer
			GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = true;
			System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt",block + "," + j + "," + tmpInterval + ","  + allTestBlocks[block][j][0] + "," +allTestBlocks[block][j][1]+ ",");

			while(nextTrial == false){
				yield;
			}
		}
	}//closes block loop

		//break after training block
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Practice Block Complete";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

}//closes start function

function Update(){

	if(Input.GetKeyDown(KeyCode.Alpha1)){
		responseVar = "1";
 	}

 	if(Input.GetKeyDown(KeyCode.Alpha2)){
		responseVar = "2";
 	}

	if(Input.GetKeyDown(KeyCode.Space)){
		System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt", responseVar + '\n');
		nextTrial = true;
		GameObject.Find("target1").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target2").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target3").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target4").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target5").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target6").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target7").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target8").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target9").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target10").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target11").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target12").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = false;
	}
}