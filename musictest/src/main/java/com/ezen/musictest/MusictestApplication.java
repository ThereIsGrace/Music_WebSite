package com.ezen.musictest;

import com.ezen.musictest.domain.Board;
import com.ezen.musictest.repository.BoardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Arrays;

@EnableJpaAuditing
@SpringBootApplication
public class MusictestApplication implements CommandLineRunner {

	private static final Logger logger =
			LoggerFactory.getLogger(MusictestApplication.class);

	@Autowired
	private BoardRepository boardRepository;

	//mock 데이터
	@Override
	public void run(String... args) throws Exception {
		Board board1
				= new Board().builder()
				.title("title1")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test01")
				.build();

		Board board2
				= new Board().builder()
				.title("title2")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test02")
				.build();

		Board board3
				= new Board().builder()
				.title("title3")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test02")
				.build();

		Board board4
				= new Board().builder()
				.title("title4")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test03")
				.build();

		Board board5
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board6
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board7
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board8
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board9
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board10
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board11
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();

		Board board12
				= new Board().builder()
				.title("title5")
				.content("<h3>contentcontentcontentcontentcontentcontent</h3>")
				.writer("test04")
				.build();


		boardRepository.saveAll(Arrays.asList(
				board1, board2, board3, board4, board5,
				board6, board7, board8, board9, board10,
				board11, board12
		));

		for(Board board : boardRepository.findAll()){
			logger.info("title: " + board.getTitle());
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(MusictestApplication.class, args);
	}
}
