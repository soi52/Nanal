package com.dbd.nanal.controller;

import com.dbd.nanal.dto.DiaryRequestDTO;
import com.dbd.nanal.dto.DiaryResponseDTO;
import com.dbd.nanal.service.DiaryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Api(tags = {"Diary관련 API"})
@RestController
@RequiredArgsConstructor
@RequestMapping("diary")
public class DiaryController {

    private final DiaryService diaryService;

    @ApiOperation(value = "일기 생성", notes = "새로운 일기를 생성합니다.")
    @PostMapping("")
    public ResponseEntity<?> writeDiary(@ApiParam(value = "일기 정보")@RequestBody DiaryRequestDTO diary, HttpSession session) {
        try{
            //diary keyword analyze
            //picture
            //music
            return new ResponseEntity<>(diaryService.save(diary.toEntity()), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "diaryIdx로 일기 내용 조회", notes =
            "일기 내용을 조회합니다.\n" +
                    "[Front] \n" +
                    "{diaryIdx(int)} \n\n" +
                    "[Back] \n" +
                    "{diaryIdx(int), userIdx(int), creationDate(Date), content(String), picture(String), music(int), emo(String)} ")
    @GetMapping("/{diaryIdx}")
    // 일기 리턴
    public ResponseEntity<?> getDiary(@ApiParam(value = "일기 id")@PathVariable("diaryIdx") int diaryIdx){
        try{
            DiaryResponseDTO diaryResponseDTO=diaryService.getDiary(diaryIdx);
            if(diaryResponseDTO!=null)
                return new ResponseEntity<>(diaryResponseDTO, HttpStatus.OK);
            else
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "diaryIdx로 일기 삭제", notes =
            "일기를 삭제합니다.\n" +
                    "[Front] \n" +
                    "{diaryIdx(int)} \n\n" +
                    "[Back] \n" +
                    "ok(200)")
    @DeleteMapping("/{diaryIdx}")
    public ResponseEntity<?> deleteDiary(@ApiParam(value="일기 id") @PathVariable("diaryIdx") int diaryIdx){
        try{
            diaryService.deleteDiary(diaryIdx);
            return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "groupIdx로 일기 리스트 리턴", notes =
            "일기를 삭제합니다.\n" +
                    "[Front] \n" +
                    "{groupIdx(int)} \n\n" +
                    "[Back] \n" +
                    "[{diaryIdx(int), userIdx(int), creationDate(Date), content(String), picture(String), music(int), emo(String)}]")
    @GetMapping("/list/{groupIdx}")
    public ResponseEntity<?> DiaryList(@PathVariable("groupIdx") int groupIdx){
        try{
            List<DiaryResponseDTO> diaryRequestDTOList=diaryService.diaryList(groupIdx);
            return ResponseEntity.status(HttpStatus.OK).body(diaryRequestDTOList);
        }catch (Exception e){
            return new ResponseEntity<>("서버오류", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}