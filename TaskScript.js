//task variables here.
import UnityEngine.UI;
var style : GUIStyle;
//All the sprites used for target objects
var target1:GameObject; 
var target2:GameObject;
var target3:GameObject;
var target4:GameObject;
var target5:GameObject;
var target6:GameObject;
var target7:GameObject;
var target8:GameObject;
var target9:GameObject;

var tmpObject:GameObject;//this is the shell to change which object is presented on each trial variably in a loop
var tmpString:String;

//Arrays of objects and intervals used
var objectList = new Array("target1","target2","target3");
var objectList_2 = new Array("target4","target5","target6");
var objectList_3 = new Array("target7","target8","target9");

var orderArray_1 = new Array(0,1,2);
var orderArray_2 = new Array(1,2,0);
var orderArray_3 = new Array(2,0,1);
var orderArray_4 = new Array(0,2,1);

var allOrderArray = new Array(orderArray_1,orderArray_2,orderArray_3,orderArray_4);//array used for training
var allOrderArray_2 = new Array(orderArray_2,orderArray_3,orderArray_4,orderArray_1);//array used for test trials
var allOrderArray_3 = new Array(orderArray_3,orderArray_1,orderArray_4,orderArray_2);//array used for test trials
var allOrderArray_4 = new Array(orderArray_4,orderArray_3,orderArray_1,orderArray_2);//array used for test trials

//old order    var allOrderArray_2 = new Array(orderArray_2,orderArray_4,orderArray_1,orderArray_3);//array used for test trials

//lists of intervals for 3 blocks
var intervalArray =   new Array(15,30,60);// array of all possible temporal intervals in seconds
var intervalArray_2 = new Array(10,60,75);
var intervalArray_3 = new Array(5,20,45);

//variables for block 1
var testObjects_1 = new Array("target1","target2");
var testObjects_2 = new Array("target1","target3");
var testObjects_3 = new Array("target2","target1");
var testObjects_4 = new Array("target3","target1");
var testObjects_5 = new Array("target2","target3");
var testObjects_6 = new Array("target3","target2");

var block1TestObjects = new Array(testObjects_3,testObjects_4,testObjects_1);
var block2TestObjects = new Array(testObjects_2,testObjects_2,testObjects_6);
var block3TestObjects = new Array(testObjects_1,testObjects_6,testObjects_3);
var block4TestObjects = new Array(testObjects_4,testObjects_5,testObjects_5);

var allTestBlocks = new Array(block1TestObjects,block2TestObjects,block3TestObjects,block4TestObjects);

//variables for block 2
var testObjects_7 = new Array("target4","target5");
var testObjects_8 = new Array("target4","target6");
var testObjects_9 = new Array("target5","target4");
var testObjects_10 = new Array("target6","target4");
var testObjects_11 = new Array("target5","target6");
var testObjects_12 = new Array("target6","target5");

var block1TestObjects_2 = new Array(testObjects_10,testObjects_10,testObjects_7);
var block2TestObjects_2 = new Array(testObjects_8,testObjects_11,testObjects_12);
var block3TestObjects_2 = new Array(testObjects_7,testObjects_12,testObjects_11);
var block4TestObjects_2 = new Array(testObjects_9,testObjects_8,testObjects_9);

var allTestBlocks_2 = new Array(block1TestObjects_2,block2TestObjects_2,block3TestObjects_2,block4TestObjects_2);

//variables for block 3
var testObjects_13 = new Array("target7","target8");
var testObjects_14 = new Array("target7","target9");
var testObjects_15  = new Array("target9","target7");
var testObjects_16 = new Array("target8","target7");
var testObjects_17 = new Array("target8","target9");
var testObjects_18 = new Array("target9","target8");

var block1TestObjects_3 = new Array(testObjects_15,testObjects_17,testObjects_13);
var block2TestObjects_3 = new Array(testObjects_14,testObjects_16,testObjects_18);
var block3TestObjects_3 = new Array(testObjects_13,testObjects_18,testObjects_15);
var block4TestObjects_3 = new Array(testObjects_17,testObjects_14,testObjects_16);

var allTestBlocks_3 = new Array(block1TestObjects_3,block2TestObjects_3,block3TestObjects_3,block4TestObjects_3);

//this will change as well
var ITI:int = 2; // time (seconds) that object is on the screen during training trials.
public var responseVar:String;
public var nextTrial:boolean = false;
public var hold:boolean = false;
public var tmpVar:int;
public var i:int;
public var j:int;
public var k:int;
public var l:int;
public var m:int;
public var n:int;
public var tmpInterval:int;

var WaterClip_1:MovieTexture;//creates the movie texture, this will have to be changed to _1,_2 etc for each of the different movies
var PlanetEarth_1:MovieTexture;
var PlanetEarth_2:MovieTexture;
var PlanetEarth_3:MovieTexture;
var movieImage:UI.RawImage;//creates the raw image object for the movie to be attached
			
function Start(){
//after instructions initiate the movie texture.  This should play the entire time unless instructions
//are on the screen
    movieImage.enabled = false;//turns off the movie image for the startup screen
    movieImage.texture=PlanetEarth_1;//sets the movie texture to the raw image object
	var aud: AudioSource = GetComponent.<AudioSource>();
	aud.clip = PlanetEarth_1.audioClip;

	//is there a movie.Pause??  Might need that if I can't find videos long enough to play the length of a block
	//need to write the encoding instructions to replace 'hello world'
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
			PlanetEarth_1.Play();//sets the movie playing

		    movieImage.enabled = true;//turns on the movie at the beginning of the interval
   			tmpInterval= intervalArray[allOrderArray[block][i]];//gets the interval to wait on that trial
   			tmpString = objectList[allOrderArray[block][i]];//gets the string of the object name to be presented
   			tmpObject=GameObject.Find(tmpString);//finds the game object
   			tmpObject.transform.position = Vector3(0,0,0);//moves the game object to center
   			yield WaitForSeconds(tmpInterval);//waits for the selected temporal inteval before presenting the object
   			aud.Pause();
			PlanetEarth_1.Pause();//sets the movie playing

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
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Break. \n Press Return to Continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

	//Set 2

	movieImage.texture=PlanetEarth_3;//sets the movie texture to the raw image object
	aud.clip = PlanetEarth_3.audioClip;

	for(block = 0; block < 4; block++){//loops over 3 blocks of 3 trials each
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("BreakText").GetComponent(TextMesh).text = "Start";//change this to the encoding instructions
		yield WaitForSeconds(2);
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

		for(k  = 0; k < 3; k++){ //determines the object to be presented
				    movieImage.enabled = true;//turns on the movie at the beginning of the interval

			aud.Play();
			PlanetEarth_3.Play();//sets the movie playing

   			tmpInterval= intervalArray_2[allOrderArray_2[block][k]];//gets the interval to wait on that trial
   			tmpString = objectList_2[allOrderArray_2[block][k]];//gets the string of the object name to be presented
   			tmpObject=GameObject.Find(tmpString);//finds the game object
   			tmpObject.transform.position = Vector3(0,0,0);//moves the game object to center
   			yield WaitForSeconds(tmpInterval);//waits for the selected temporal inteval before presenting the object
   					    movieImage.enabled = false;//turns on the movie at the beginning of the interval

   			aud.Pause();
			PlanetEarth_3.Pause();//sets the movie playing
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = true;
   			yield WaitForSeconds(ITI);
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = false;

		}

		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Break. \n Press Return to Continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;
 	}//closes block loop

		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("RecallInstructions").GetComponent(TextMesh).text = "You will now start the retrieval portion\n of the task. You will see 2 items on\n the screen after an interval of time.\nPlease choose the number of the\nitem that was associated with that\ninterval and press space bar\nto lock in your answer.\nPress 7 to continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Alpha7)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;

 	for(block = 0; block < 4; block++){//loops over 3 blocks of 3 trials each
		for(var l :int = 0; l < 3; l++){
			nextTrial = false;//this holds the decision screen until a choice is made
   			tmpInterval = intervalArray_2[allOrderArray_3[block][l]];//change this to a new pseudo random order
   			yield WaitForSeconds(tmpInterval);

   			//need to grab 2 objects to present on each trial
   			GameObject.Find(allTestBlocks_2[block][l][0]).transform.position = Vector3(-3,0,0);//transforms the game objects to correct position
   			GameObject.Find(allTestBlocks_2[block][l][1]).transform.position = Vector3(3,0,0);

   			GameObject.Find(allTestBlocks_2[block][l][0]).GetComponent(SpriteRenderer).enabled = true;//turns on test object renderer
	    	GameObject.Find(allTestBlocks_2[block][l][1]).GetComponent(SpriteRenderer).enabled = true;
			
			GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = true;//turns on number choice renderer
			GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = true;
						System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt",block + "," + l + "," + tmpInterval + "," + allTestBlocks[block][l][0] + "," +allTestBlocks[block][l][1]+ ",");

			while(nextTrial == false){
				yield;
			}
		}
	}//closes block loop

		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Break. \n Press Return to Continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

	//set 3
	movieImage.texture=PlanetEarth_2;//sets the movie texture to the raw image object
	aud.clip = PlanetEarth_2.audioClip;

	for(block = 0; block < 4; block++){//loops over 3 blocks of 3 trials each
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("BreakText").GetComponent(TextMesh).text = "Start";//change this to the encoding instructions
		yield WaitForSeconds(2);
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

		for(m  = 0; m < 3; m++){ //determines the object to be presented
		    movieImage.enabled = true;//turns on the movie at the beginning of the interval

			aud.Play();
			PlanetEarth_2.Play();//sets the movie playing

   			tmpInterval= intervalArray_3[allOrderArray_3[block][m]];//gets the interval to wait on that trial
   			tmpString = objectList_3[allOrderArray_3[block][m]];//gets the string of the object name to be presented
   			tmpObject=GameObject.Find(tmpString);//finds the game object
   			tmpObject.transform.position = Vector3(0,0,0);//moves the game object to center
   			yield WaitForSeconds(tmpInterval);//waits for the selected temporal inteval before presenting the object
   			movieImage.enabled = false;//turns on the movie at the beginning of the interval
   			aud.Pause();
			PlanetEarth_2.Pause();//sets the movie playing
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = true;
   			yield WaitForSeconds(ITI);
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = false;

		}

		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Break. \n Press Return to Continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;
 	}

		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("RecallInstructions").GetComponent(TextMesh).text = "You will now start the retrieval portion\n of the task. You will see 2 items on\n the screen after an interval of time.\nPlease choose the number of the\nitem that was associated with that\ninterval and press space bar\nto lock in your answer.\nPress 6 to continue";//change this to the encoding instructions
 		while (!Input.GetKeyDown(KeyCode.Alpha6)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;

 	for(block = 0; block < 4; block++){//loops over 3 blocks of 3 trials each
		for(var n :int = 0; n < 3; n++){
			nextTrial = false;
   			tmpInterval = intervalArray_3[allOrderArray_4[block][n]];//change this to a new pseudo random order
   			yield WaitForSeconds(tmpInterval);

   			//need to grab 2 objects to present on each trial
   			GameObject.Find(allTestBlocks_3[block][n][0]).transform.position = Vector3(-3,0,0);//transforms the game objects to correct position
   			GameObject.Find(allTestBlocks_3[block][n][1]).transform.position = Vector3(3,0,0);

   			GameObject.Find(allTestBlocks_3[block][n][0]).GetComponent(SpriteRenderer).enabled = true;//turns on test object renderer
	    	GameObject.Find(allTestBlocks_3[block][n][1]).GetComponent(SpriteRenderer).enabled = true;

			GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = true;//turns on number choice renderer
			GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = true;
			System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt",block + "," + n + "," + tmpInterval + "," + allTestBlocks[block][n][0] + "," +allTestBlocks[block][n][1]+ ",");

			while(nextTrial == false){
				yield;
			}
		}
	}//closes block loop
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
	    GameObject.Find("BreakText").GetComponent(TextMesh).text = "Done!";//change this to the encoding instructions
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
		GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = false;
	}
}