-- Enable Row Level Security on all tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE giving_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_assets ENABLE ROW LEVEL SECURITY;

-- User Roles Policies
CREATE POLICY "Users can read their own role"
  ON user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON user_roles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Videos Policies (Public read, Admin/Media write)
CREATE POLICY "Public can read videos"
  ON videos FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins and media can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );

CREATE POLICY "Admins and media can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );

CREATE POLICY "Admins and media can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );

-- Audio Policies (Public read, Admin/Media write)
CREATE POLICY "Public can read audio"
  ON audio FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins and media can insert audio"
  ON audio FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );

CREATE POLICY "Admins and media can update audio"
  ON audio FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );

CREATE POLICY "Admins and media can delete audio"
  ON audio FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );

-- Events Policies (Public read, Admin write)
CREATE POLICY "Public can read events"
  ON events FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Testimonies Policies (Public read approved only, Admin write)
CREATE POLICY "Public can read approved testimonies"
  ON testimonies FOR SELECT
  TO authenticated, anon
  USING (status = 'approved');

CREATE POLICY "Anyone can insert testimonies (pending status)"
  ON testimonies FOR INSERT
  TO authenticated, anon
  WITH CHECK (status = 'pending');

CREATE POLICY "Admins can update testimonies"
  ON testimonies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Branches Policies (Public read, Admin write)
CREATE POLICY "Public can read branches"
  ON branches FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage branches"
  ON branches FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Departments Policies (Admin only - not public)
CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Giving Records Policies (Admin/Finance read, Admin write)
CREATE POLICY "Admins and finance can read giving records"
  ON giving_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'finance')
    )
  );

CREATE POLICY "Admins can insert giving records"
  ON giving_records FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Upload Assets Policies (Admin/Media only)
CREATE POLICY "Admins and media can manage upload assets"
  ON upload_assets FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role IN ('admin', 'media')
    )
  );


