import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
      this.songService.getAllSongs().subscribe((data) => {
        this.songs = data;
      })
  }
}
