import { Component, OnInit, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService, ArtistGroup } from '../../services/supabase.service';

@Component({
  selector: 'app-artist-selector',
  imports: [CommonModule],
  templateUrl: './artist-selector.html',
  styleUrl: './artist-selector.css'
})
export class ArtistSelector implements OnInit {
  private supabaseService = inject(SupabaseService);

  groups = signal<ArtistGroup[]>([]);
  activeGroupId = signal<number | null>(null);

  groupChange = output<number | null>();

  async ngOnInit() {
    const groups = await this.supabaseService.getGroups();
    if (groups) {
      this.groups.set(groups);
    }
  }

  onGroupClick(groupId: number | null): void {
    this.activeGroupId.set(groupId);
    this.groupChange.emit(groupId);
  }

  isActive(groupId: number | null): boolean {
    return this.activeGroupId() === groupId;
  }
}
